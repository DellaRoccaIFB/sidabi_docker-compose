import jwt
import os
from flask import jsonify
from sqlalchemy import text
from extensions import engine


def verify_user(username, password):
    query = """
        SELECT *
         FROM sidabi.login l
         WHERE
         l.usuario = :username
         AND
         l.senha = md5(:password);
    """
    with engine.begin() as conn:
        resultproxy = conn.execute(
            text(query), {"username": username, "password": password}
        ).first()
        return jsonify({"id": resultproxy["id"]})


def authenticate(auth_token):
    try:
        payload = jwt.decode(
            auth_token, os.environ.get("SECRET_KEY"), algorithms=["HS256"]
        )
    except jwt.ExpiredSignatureError:
        return "Signature expired. Please log in again."
    except jwt.InvalidTokenError:
        return "Invalid token. Please log in again."
    return payload["username"], payload["password"]
