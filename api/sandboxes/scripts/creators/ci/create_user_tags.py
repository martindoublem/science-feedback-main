from sqlalchemy_api_handler import ApiHandler, logger

from models.tag import Tag
from models.user import User
from models.user_tag import UserTag

def create_user_tags():
    logger.info('create user_tags')

    user_tags_by_name = {}

    user = User.query.filter_by(email="sftest.reviewer0@sciencefeedback.co").one()
    tag = Tag.query.filter_by(text="coral").one()
    user_tags_by_name["reviewer 0 / coral"] = UserTag(
        user=user,
        tag=tag
    )

    user = User.query.filter_by(email="sftest.reviewer2@sciencefeedback.co").one()
    tag = Tag.query.filter_by(text="immunology").one()
    user_tags_by_name["reviewer 2 / immunology"] = UserTag(
        user=user,
        tag=tag
    )


    ApiHandler.save(*user_tags_by_name.values())

    logger.info('created {} user_tags_by_name'.format(len(user_tags_by_name)))

    return user_tags_by_name
