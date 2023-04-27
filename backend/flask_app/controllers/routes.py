from flask_app import app
from flask import  redirect, request, session, flash, jsonify
from flask_app.models.user import User
from flask_app.models.trip import Trip
from flask_app.models.place import Place
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)



#--------------------------------------------- LOGIN/REG ROUTES -----------------------------------

@app.route('/')
def index():
    return True

#REGISTER - VALIDATIONS IN USER MODEL 
@app.route('/register/user', methods=['POST'])
def register():
    data = request.get_json()
    print(data)
    user_data = User.validate_user(data)
    print(f'FROM BACKEND -------{user_data}')
    if user_data['success'] != True:
        response = {
            'success': False,
            'messages': user_data['messages']
        }
        print(f'RESPONSE ---------------{response}')
        return jsonify(response)
    
    pw_hash = bcrypt.generate_password_hash(data['password'])
    # if not User.validate_user(request.form):
    #     session['first_name'] = request.form['first_name']
    #     session['last_name'] = request.form['last_name']
    #     session['email'] = request.form['email']
    #     return redirect('/')
    # else:
    #     session.clear()
    
    data = {
        "first_name": data['first_name'],
        "last_name": data['last_name'],
        "email": data['email'],
        "password": pw_hash,
        "interests": data['interests']
        }
    new_user_id = User.save_user(data)
    result = User.get_user_by_id({'id': new_user_id})
    session['user_id'] = result.id
    session['first_name'] = result.first_name
    session['interests'] = result.interests
    user = session['user_id']
    response = {
        'user': user,
        'success': True
        }
    return jsonify(response)
        


#LOGIN - VALIDATIONS IN USER MODEL
@app.route('/login/user', methods=['POST'])
def login():
    data = request.get_json()
    login_email = {
        'email': data['email'],
    }
    result = User.get_by_email(login_email)
    login_pass = {
        'password': data['password'],
    }
    if result == None or bcrypt.check_password_hash(result.password, login_pass['password']) == False:
        response = {
            'success': False,
            'message': 'Invalid Login Credentials'
        }
        print(f'THIS WORKS --------{response}')
        return jsonify(response)
    print("WE MADE IT")
    session['user_id'] = result.id
    session['first_name'] = result.first_name
    session['interests'] = result.interests
    session['email'] = result.email
    user = session['user_id']
    response = {
        'user': user,
        'success': True
        }
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return jsonify(response)



#LOGOUT & CLEAR SESSION 
@app.route('/logout')
def logout_user():
    session.clear()
    response = {
        'success': True,
        'message': 'Session has been cleared'
    }
    print('THIS WORKED')
    return jsonify(response)

#--------------------------------------------- DASHBOARD/TRIP ROUTES -----------------------------------



# @app.route('/dashboard/<int:user_id>')
# def dashboard():
#     if 'user_id' not in session:
#         response = {
#             'success': False
#         }
#         return jsonify(response)
    
#     response = {
#         'success': True
#     }
#     # response.headers.add('Access-Control-Allow-Origin', '*')
#     return jsonify(response)

@app.route ('/dashboard/<int:user_id>/plan/new', methods = ['POST'])
def new_trip(user_id):
    data = request.get_json()
    print(data)
    data = {
        'user_id': user_id,
        "title": data['title'],
        "city": data['city'],
        "state": data['state'],
        "country": data['country'],
        "start_date": data['start_date'],
        "end_date": data['end_date']
        }
    
    new_trip = Trip.save_trip(data)
    data = {
        'id': new_trip
    }
    trip_details = Trip.get_one_trip_title(data)
    response = {
        'tripTitle': trip_details['title'],
        'tripId': new_trip,
        'success': True
        }
    print(f"response = {response}")
    return jsonify(response)



@app.route('/dashboard/<int:user_id>/plan/<int:trip_id>/new', methods=['POST'])
def add_place(user_id, trip_id):
    data = request.get_json()
    data = {
        'trip_id': trip_id,
        'name': data['name'],
        'address': data['address'],
        'notes': data['notes'],
    }
    Place.save_place(data)
    response = {
        'success': True,
    }
    return jsonify(response)
    
    
@app.route('/dashboard/<int:user_id>/plan/<int:trip_id>')
def get_trip_details(user_id, trip_id):
    data = {
        'user_id': user_id,
        'id': trip_id,
    }
    response = Trip.get_one_trip_with_places(data)
    data = {
        'id': trip_id
    }
    trip_details = Trip.get_one_trip_title(data)
    response = {
        'success': True,
        'tripTitle': trip_details,
        'data': response
        
        # 'city': result['city'],
        # 'state': result['state'],
        # 'country': result['country'],
        # 'startDate': result['start_date'],
        # 'endDate': result['end_date'],
    }
    
    return jsonify(response)


@app.route('/dashboard/<int:user_id>/plan/<int:trip_id>/<int:place_id>/delete')
def delete_place( user_id, trip_id, place_id):
    data = {
        'id': place_id,
    }
    Place.delete_place(data)
    print('SUCCESSSS--------------------------------')
    response = {
        'success': True,
    }
    return jsonify(response)


#VIEW - PLACE UPDATE
@app.route('/dashboard/<int:user_id>/plan/<int:trip_id>/<int:place_id>/edit')
def edit_place(user_id, trip_id, place_id):
    data = {
        'id': place_id,
    }
    one = Place.get_place_by_id(data)
    response = {
        'success': True,
        'data': one[0]
    }

    return jsonify(response)


#POST - PLACE UPDATE

@app.route('/dashboard/<int:user_id>/plan/<int:trip_id>/<int:place_id>/update', methods=['PUT'])
def update_place(user_id, trip_id, place_id):
    data = request.get_json()
    print(data)
    data = {
        'trip_id': trip_id,
        'name': data['name'],
        'address': data['address'],
        'notes': data['notes'],
        'id': place_id
    }
    Place.edit_place(data)
    response = {
        'success': True,
    }
    return jsonify(response)



#VIEW MY TRIPS PAGE
@app.route('/<int:user_id>/trips')
def my_trips(user_id):
    data = {
        'user_id': user_id
    }
    trips = Trip.get_trips_by_user_id(data)
    response = {
        'success': True,
        'trips': trips
    }
    return jsonify(response)


#VIEW TRIP DETAILS (TRIPS PAGE)
@app.route('/<int:user_id>/trips/<int:trip_id>')
def view_one_trip_details(user_id, trip_id):
    data = {
        'user_id': user_id,
        'id' : trip_id
    }
    one = Trip.get_one_trip_with_places(data)
    response = {
        'success': True,
        'data': one
    }
    return jsonify(response)

#VIEW TRIP UPDATE
@app.route('/<int:user_id>/trips/<int:trip_id>/edit')
def edit_trip(user_id, trip_id):
    data = {
        'user_id': user_id,
        'id' : trip_id
    }
    one = Trip.get_one_trip_with_places(data)
    response = {
        'success': True,
        'data': one
    }
    return jsonify(response)

#POST TRIP UPDATE
@app.route('/<int:user_id>/trips/<int:trip_id>/edit/update', methods=['POST'])
def update_trip(user_id, trip_id):
    data = request.get_json()
    data = {
        'id': trip_id,
        'title': data['title'],
        'city': data['city'],
        'country': data['country'],
        'start_date': data['start_date'],
        'end_date': data['end_date'],
    }
    Trip.edit_trip(data)
    response = {
        'success': True,
    }
    return jsonify(response)

#--------------------------------------------------- USER/PROFILE ROUTES --------------------------------


#VIEW PROFILE 
@app.route('/<int:user_id>/profile')
def view_profile(user_id):
    data = {
        'id': user_id,
    }
    trips = Trip.get_trips_by_user_id(data)
    user = User.get_user_by_id(data)
    response = {
        'success': True,
        'userData': user,
        'tripsData': trips
    }
    return jsonify(response)


#VIEW PROFILE
@app.route('/<int:user_id>/profile/pasttrips')
def view_pasttrips(user_id):
    data = {
        'id': user_id,
    }
    trips = Trip.get_trips_by_user_id(data)
    user = User.get_user_by_id(data)
    response = {
        'success': True,
        'userData': user,
        'tripsData': trips
    }
    return jsonify(response)



#UPDATE USER 
@app.route('/update/user', methods=['POST'])
def update_user():
    if 'user_id' not in session:
        return redirect('/')
    if not User.validate_update(request.form):
        return redirect('/account')
    User.update_user(request.form)
    return redirect('/account')







# Login '/' if not -> '/register'


# /dashboard/<int:user_id - dashboard: plan a trip and openAI
# /dashboard/<int:user_id>/plan/new - dashboard: post data from "add a trip"
# /dashboard/<int:user_id>/plan/<int:trip_id> - open rest of dashboard to add places to trip - need tripId and success message in response



# <int:user_id>/profile - all profile- upcoming default (bottom right window on wireframe)
# <int:user_id>/profile/pasttrips - all profile- past (bottom right window on wireframe)



# <int:user_id>/trips - list of trips (top right window on wireframe)
# <int:user_id>/trips/<int:trip_id>/<int:place_id>/edit - edit place details
# <int:user_id>/trips/<int:trip_id> - details of trip render on lower part of page (top right window on wireframe)
