from flask_app import app
from flask import render_template, redirect, request, session, flash, jsonify
from flask_app.models.user import User
from flask_app.models.trip import Trip
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)



#--------------------------------------------- LOGIN/REG ROUTES -----------------------------------


#REGISTER - VALIDATIONS IN USER MODEL 
@app.route('/register/user', methods=['POST'])
def register():
    data = request.get_json()
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
    login_data = {
        'email': data['email'],
        # 'password': data['password'],
    }
    result = User.get_by_email(login_data)
    # if not User.validate_login(stuff):
    #     return redirect('/')
    # bcrypt.check_password_hash()
    # data = {
    #     "email": data['email'],
    #     "password": pw_hash,
    #     }
    
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
    return redirect('/')

#--------------------------------------------- DASHBOARD/TRIP ROUTES -----------------------------------


#HOME PAGE RENDER UPON SUCCESSFUL LOGIN 
@app.route('/dashboard/<int:user_id>')
def dashboard(user_id):
    # if 'user_id' not in session:
    #     return redirect('/')

    data_dict = {
        'user_id': user_id
    }
    all_trips = Trip.get_trips_by_user_id(data_dict)
    
    trips = []

    for trip in all_trips:
        trip = {
            'id': trip.id,
            'user_id': trip.user_id,
            'title': trip.title,
            'city': trip.city,
            'state': trip.state,
            'country': trip.country,
            'start_date': trip.start_date,
            'end_date': trip.end_date,
        }
        trips.append(trip)
    response = jsonify(trips)
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route ('/<int:user_id>/plan/new', methods = ['POST'])
def new_trip(user_id):
    data = request.get_json()
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
    response = {
        'trip_id': new_trip,
        'success': True
        }
    print(response)
    return jsonify(response)




#--------------------------------------------------- USER/PROFILE ROUTES --------------------------------


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
# <int:user_id>/trips/<int:trip_id> - details of trip render on lower part of page (top right window on wireframe)
