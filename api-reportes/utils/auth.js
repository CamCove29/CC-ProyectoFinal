const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const SECRET_KEY = process.env.SECRET_KEY;  // Tu clave secreta

// Configurar DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const validateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Obtener el token del header (Bearer token)
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    // Decodificar el token para obtener el tenant_id y user_id (esto no verifica la validez aún)
    const decoded = jwt.verify(token, SECRET_KEY);

    const tenantId = decoded.tenant_id;
    const userId = decoded.user_id; // Asumimos que el token tiene un user_id

    // Ahora consultar en DynamoDB si el token es válido
    const params = {
      TableName: process.env.AUTH_TOKENS_TABLE,  // La tabla de tokens
      Key: {
        tenant_id: tenantId,  // Usamos tenant_id del token
        token: token  // Usamos el token como clave de rango
      }
    };

    // Consultamos DynamoDB para verificar si el token existe
    const result = await dynamoDB.get(params).promise();

    // Si no existe el token en la base de datos, rechazamos la solicitud
    if (!result.Item) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    // Si el token es válido, asignamos la información del usuario a req.user
    req.user = decoded;
    next();

  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = { validateToken };
