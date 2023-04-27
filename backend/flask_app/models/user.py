from flask_app.config.connection import connectToMySQL
from flask_app import app
from flask import flash, session, request, jsonify, json
import re
from flask_bcrypt import Bcrypt     
bcrypt = Bcrypt(app)

EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')


class User:
    DB = "mydb"
    def __init__(self, data ):
        self.id = data['id']
        self.first_name = data['first_name']
        self.last_name = data['last_name']
        self.email = data['email']
        self.password = data['password']
        self.interests = data['interests']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.trips = []
        
        
    
    @classmethod
    def save_user(cls, data):
        query = """
                INSERT INTO users 
                (first_name, last_name, email, password, interests, created_at, updated_at)
                VALUES 
                ( %(first_name)s, %(last_name)s , %(email)s , %(password)s , %(interests)s, NOW() , NOW() )
                ;"""
        return connectToMySQL(cls.DB).query_db(query, data)
    
    
    
    #GET USERS ALL INFO BY EMAIL ?
    @classmethod
    def get_by_email(cls, data):
        query = """
                SELECT * FROM users
                WHERE email = %(email)s
                ;"""
        result = connectToMySQL(cls.DB).query_db(query, data)
        if len(result) < 1:
            return False
        return cls(result[0])
    
    @classmethod
    def get_user_by_id(cls, data):
        query = """
                SELECT * FROM users
                WHERE id = %(id)s
                ;"""
        result = connectToMySQL(cls.DB).query_db(query, data)
        if len(result) < 1:
            return False
        return cls(result[0])
    
    #GET USERS INFO FROM ID 
    @classmethod
    def get_by_id(cls, data):
        query = """
                SELECT first_name, last_name, email
                FROM users
                WHERE id = %(id)s
                ;"""
        results = connectToMySQL(cls.DB).query_db(query, data)
        return results
    
    
    @classmethod
    def update_user(cls, data):
        query = """
                UPDATE users
                SET first_name = %(first_name)s, last_name = %(last_name)s, email = %(email)s, password = password, interests = %(interests)s, updated_at = NOW()
                WHERE id = %(id)s
                ;"""
        results = connectToMySQL(cls.DB).query_db(query, data)
        return results
    
    
    #REGISTRATION 
    @staticmethod
    def validate_user(user):
        print(f"user = {user}")
        is_valid = True
        response = {}
        #check if user exists 
        data = {
            "email": user['email']
        }
        valid_user = User.get_by_email(data)
        if valid_user:
            response['valid_user'] = 'Email already in use'
            is_valid = False
        # Registration Validations
        # if len(user['first_name']) < 3:
        #     response.append('First Name must be at least 3 characters')
        #     is_valid = False
        # if len(user['last_name']) < 3:
        #     response.append('Last Name must be at least 3 characters')
        #     is_valid = False
        if not EMAIL_REGEX.match(user['email']):
            response['valid_email'] = 'Not a valid email address'
            is_valid = False
        if len(user['password']) < 6:
            response['valid_pw'] = 'Password must be at least 6 characters'
            is_valid = False
        if user['conf_password'] != user['password']:
            response['pw_match'] = 'Passwords do not match'
            is_valid = False
        result = {
            'success': is_valid,
            'messages': response,
            # 'messages': {
                
            # }
        }
        print(f'FROM MODEL ----------{result}')
        return result

    
    # #LOGIN VALIDATION 
    # @staticmethod
    # def validate_login(user):
    #     is_valid = True 
    #     data = {
    #         'email': user['email'],
    #         'password': user['password'],
    #     }
    #     valid_user = User.get_by_email(data)
    #     print(valid_user.first_name, valid_user.last_name)
    #     if not valid_user:
    #         flash('Invalid login credientials.', 'login')
    #         is_valid = False
    #     if valid_user:
    #         if not bcrypt.check_password_hash(valid_user.password, user['password']):
    #             flash('Invalid login credentials.', 'login')
    #             is_valid = False
    #     return is_valid



    # # UPDATE VALIDATION
    # @staticmethod
    # def validate_update(user):
    #     is_valid = True
    #     if len(user['first_name']) < 3:
    #         flash("First name must be at least 3 characters", 'update')
    #         is_valid = False
    #     if len(user['last_name']) < 3:
    #         flash("Last name must be at least 3 characters", 'update')
    #         is_valid = False
    #     if not EMAIL_REGEX.match(user['email']):
    #         flash('Invalid email address', 'update')
    #         is_valid = False
    #     return is_valid