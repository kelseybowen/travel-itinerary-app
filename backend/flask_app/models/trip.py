from flask_app.config.connection import connectToMySQL
from flask_app.models import user, place




class Trip:
    DB = "mydb"
    def __init__(self, data ):
        self.id = data['id']
        self.user_id = data['user_id']
        self.title = data['title']
        self.city = data['city']
        self.state = data['state']
        self.country = data['country']
        self.start_date = data['start_date']
        self.end_date = data['end_date']
        self.created_at = data['created_at']
        self.updated_at = data['updated_at']
        self.user_name = None
        self.places = None
        
        
    #CRUD METHODS 
    
    @classmethod
    def save_trip(cls, data):
        query = """
                INSERT INTO trips 
                ( user_id,  title, city, state, country, start_date, end_date, created_at, updated_at)
                VALUES 
                ( %(user_id)s, %(title)s, %(city)s, %(state)s, %(country)s, %(start_date)s, %(end_date)s, NOW(), NOW() )
                ;"""
        return connectToMySQL(cls.DB).query_db(query, data)
    
    
    # GET ONE TRIP TITLE
    @classmethod
    def get_one_trip_title(cls, data):
        query = """SELECT title
                FROM trips
                WHERE id = %(id)s;
                """
        result = connectToMySQL(cls.DB).query_db(query, data)
        return result[0]
    
    #ACCESS ALL TRIPS WITH USER'S NAME
    @classmethod
    def get_trips_by_user_id(cls, data):
        query = """SELECT * 
                FROM trips
                JOIN users
                ON trips.user_id = users.id
                WHERE users.id = %(user_id)s
                ORDER BY trips.id DESC
                ;"""
        results = connectToMySQL(cls.DB).query_db(query, data)
        trips = []
        for row in results:
            trip = cls(row)
            user_data = {
                'id': row["users.id"],
                'first_name': row["first_name"],
                'last_name' : row["last_name"],
                'email' : row["email"],
                'password' : '',
                'interests' : row["interests"],
                'created_at' : row["created_at"],
                'updated_at' : row["updated_at"], 
                }
            trip.user_name = user.User(user_data)
            trips.append(trip)
        return trips
    
    
    @classmethod
    def delete_trip(cls, data):
        query = """
                DELETE FROM trips
                WHERE id = %(id)s;
                """
        results = connectToMySQL(cls.DB).query_db(query, data)
        return results
    
    @classmethod
    def edit_trip(cls, data):
        query = """
                UPDATE trips
                SET title = %(title)s, city = %(city)s, state = %(state)s, country = %(country)s, start_date = %(start_date)s, end_date = %(end_date)s updated_at = NOW() 
                WHERE id = %(id)s;
                """
        results = connectToMySQL(cls.DB).query_db(query, data)
        return results
    
    
    @classmethod
    def get_one_trip_with_places(cls,data):
        query = """
                SELECT * FROM places 
                JOIN trips 
                ON trips.id = places.trip_id 
                WHERE trips.user_id = %(user_id)s 
                AND trips.id = %(id)s
                ;"""
                
        results = connectToMySQL(cls.DB).query_db(query, data)
        return results