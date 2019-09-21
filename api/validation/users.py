from sqlalchemy_api_handler import ApiErrors

def check_allowed_changes_for_user(data):
    changes_allowed = {'email'}
    changes_asked = set(data)
    api_errors = ApiErrors()
    changes_not_allowed = changes_asked.difference(changes_allowed)
    if changes_not_allowed:
        for change in changes_not_allowed:
            api_errors.add_error(change, 'Vous ne pouvez pas changer cette information')
        raise api_errors
