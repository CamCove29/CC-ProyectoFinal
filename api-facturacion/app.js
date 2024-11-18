const express = require("express");
const billingRoutes = require("./routes/billing_routes");
const app = express();

app.use(express.json());
app.use(billingRoutes);

app.listen(3000, () => {
  console.log("API de Facturación corriendo en el puerto 3000");
});
