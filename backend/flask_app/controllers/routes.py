from flask_app import app
from flask import render_template, redirect, request, session, flash, jsonify
from flask_app.models.user import User
from flask_app.models.trip import Trip
from flask_bcrypt import Bcrypt
bcrypt = Bcrypt(app)


#LOGIN PAGE 
@app.route('/')
def index():
    return render_template('login.html')


#REGISTER - VALIDATIONS IN USER MODEL 
@app.route('/register/user', methods=['POST'])
def register():
    # if not User.validate_user(request.form):
    #     session['first_name'] = request.form['first_name']
    #     session['last_name'] = request.form['last_name']
    #     session['email'] = request.form['email']
    #     return redirect('/')
    # else:
    #     session.clear()
    pw_hash = bcrypt.generate_password_hash(request.form['password'])
    data = {
        "first_name": request.form['first_name'],
        "last_name": request.form['last_name'],
        "email": request.form['email'],
        "password": pw_hash,
        "interests": request.form['interests']
        }
    User.save_user(data)
    # user_in_db = User.get_by_email(request.form)
    # session['user_id'] = user_in_db.id
    # session['first_name'] = user_in_db.first_name
    # session['last_name'] = user_in_db.last_name
    return redirect('/dashboard')



#LOGIN - VALIDATIONS IN USER MODEL
@app.route('/login/user', methods=['POST'])
def login():
    data = {
        'email': request.form['email'],
        'password': request.form['password'],
    }
    stuff = User.get_by_email(data)
    # if not User.validate_login(request.form):
    #     return redirect('/')
    
    return redirect('/dashboard')



#HOME PAGE RENDER UPON SUCCESSFUL LOGIN 
@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        return redirect('/')
    data = {
        'email' : session['email']
    }
    stuff = User.get_by_email(data)
    stuff = [
        {'id' : stuff.id},
        {'first_name' : stuff.first_name} ,
        {'last_name' : stuff.last_name},
        {'email' : stuff.email},
        {'interests' : stuff.interests},
    ]
    trip_data = {
        'user_id' : 1,
        'id' : 1,
    }
    trip_stuff = Trip.get_one_trip_with_places(trip_data)
    
        
    return render_template('dashboard.html', stuff=stuff, trip_stuff=trip_stuff)




#UPDATE USER 
@app.route('/update/user', methods=['POST'])
def update_user():
    if 'user_id' not in session:
        return redirect('/')
    if not User.validate_update(request.form):
        return redirect('/account')
    User.update_user(request.form)
    return redirect('/account')




#LOGOUT & CLEAR SESSION 
@app.route('/logout')
def logout_user():
    session.clear()
    return redirect('/')



# Login '/' if not -> '/register'


# /dashboard - plan a trip and openAI
# dashboard/<int:trip_id> - open rest of dashboard. 



# <int:user_id>/profile - all profile- upcoming default
# <int:user_id>/profile/pasttrips - all profile- past



# <int:user_id>/trips - list of trips
# <int:user_id>/trips/<int:trip_id> - details of trip


