from flask_app.config.connection import connectToMySQL
from flask import flash



class Place:
    DB = "mydb"
    def __init__(self, data ):
        self.id = data['id']
        self.trip_id = data['trip_id']
        self.name = data['name']
        self.address = data['address']
        self.notes = data['notes']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        
    
    #CRUD methods
    @classmethod
    def save_place(cls, data):
        query = """
                INSERT INTO places 
                ( trip_id,  name, address, notes, created_at, updated_at)
                VALUES 
                ( %(trip_id)s, %(name)s, %(address)s, %(notes)s, NOW(), NOW() )
                ;"""
        return connectToMySQL(cls.DB).query_db(query, data)
    
    
    @classmethod
    def delete_place(cls, data):
        query = """
                DELETE FROM places
                WHERE id = %(id)s;
                """
        results = connectToMySQL(cls.DB).query_db(query, data)
        return results
    
    @classmethod 
    def edit_place(cls, data):
        query = """
                UPDATE places
                SET name = %(name)s, address = %(address)s, notes = %(notes)s, updated_at = NOW() 
                WHERE id = %(id)s;
                """
        results = connectToMySQL(cls.DB).query_db(query, data)
        return results
    
    @classmethod 
    def get_place_by_id(cls, data):
        query = """SELECT * 
                FROM places
                WHERE id = %(id)s
                ;"""
                
        results = connectToMySQL(cls.DB).query_db(query, data)
        return results
    
    # @staticmethod
    # def validate_place(place):
    #     is_valid = True
    #     if len(place['name']) > 3:
    #         flash('Name must be at least 3 characters', 'place')