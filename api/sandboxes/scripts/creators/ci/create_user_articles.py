from sqlalchemy_api_handler import logger


def create_user_articles():
    logger.info('create_user_articles')

    article_users_by_name = {}

    logger.info('created {} article_users_by_name'.format(len(article_users_by_name)))

    return article_users_by_name
