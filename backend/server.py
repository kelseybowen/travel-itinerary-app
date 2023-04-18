from flask_app import app
from flask_cors import CORS

api_cors_config = {
    "origins": ["http://localhost:3000"]
}
CORS(app, resources={"/*": api_cors_config})

if __name__ == "__main__":
    app.run(debug=True)
