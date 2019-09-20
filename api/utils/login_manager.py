import uuid
from flask import current_app as app, jsonify, session
from flask_login import login_user

from models.utils.api_errors import ApiErrors
from models.user import User
from repository.user_sessions import delete_user_session, \
                                     existing_user_session, \
                                     register_user_session
from utils.credentials import get_user_with_credentials


@app.login_manager.user_loader
def get_user_with_id(user_id):
    session.permanent = True
    session_uuid = session.get('session_uuid')
    if existing_user_session(user_id, session_uuid):
        return User.query.get(user_id)
    return None


@app.login_manager.request_loader
def get_user_with_request(request):
    auth = request.authorization
    if not auth:
        return None
    user = get_user_with_credentials(auth.username, auth.password)
    login_user(user, remember=True)
    stamp_session(user)
    return user


@app.login_manager.unauthorized_handler
def send_401():
    api_errors = ApiErrors()
    api_errors.addError('global', 'Authentification nécessaire')
    return jsonify(api_errors.errors), 401


def stamp_session(user):
    session_uuid = uuid.uuid4()
    session['session_uuid'] = session_uuid
    session['user_id'] = user.id
    register_user_session(user.id, session_uuid)


def discard_session():
    session_uuid = session.get('session_uuid')
    user_id = session.get('user_id')
    session.clear()
    delete_user_session(user_id, session_uuid)
