from sqlalchemy_api_handler import ApiHandler, logger

from models.article import Article
from models.verdict import Verdict
from models.user import User
from tests.utils.creators.create_verdict_user import create_verdict_user

def create_verdict_users():
    logger.info('create_verdict_users')

    verdict_users_by_name = {}

    article = Article.query.filter_by(url="http://www.dailymail.co.uk/sciencetech/article-4192182/World-leaders-duped-manipulated-global-warming-data.html").one()
    editor_user = User.query.filter_by(email="sftest.editor.0@sciencefeedback.co").one()
    verdict = Verdict.query.filter_by(
        article=article,
        user=editor_user
    ).one()
    reviewer_user = User.query.filter_by(email="sftest.reviewer.0@sciencefeedback.co").one()
    verdict_users_by_name["Great Barrier / reviewer 0"] = create_verdict_user(
        verdict=verdict,
        user=reviewer_user
    )

    ApiHandler.save(*verdict_users_by_name.values())

    logger.info('created {} verdict_users_by_name'.format(len(verdict_users_by_name)))

    return verdict_users_by_name
