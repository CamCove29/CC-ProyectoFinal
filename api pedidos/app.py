from flask import Flask
from controllers.order_controller import order_blueprint

app = Flask(__name__)
app.register_blueprint(order_blueprint)

if __name__ == '__main__':
    app.run(debug=True)
