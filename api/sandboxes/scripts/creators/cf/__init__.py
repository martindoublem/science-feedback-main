""" cf """
from models.manager import Manager
from repository.climate_feedback import get_articles_from_climate_feedback_feedbacks_scrap
from tests.utils import create_role, create_user
from utils.logger import logger

def create_sandbox(**kwargs):
    logger.info('create_cf_sandbox...')
    editor_user = create_user(
        email="emmanuel.vincent@sciencefeedback.fr",
        public_name="Emmanuel Vincent"
    )
    editor_user.setPassword("emmanuel.Vincent.0")
    create_role(editor_user, role_type="editor")
    Manager.check_and_save(editor_user)
    articles = get_articles_from_climate_feedback_feedbacks_scrap(10, editor_user)
    Manager.check_and_save(*articles)
    logger.info('create_cf_sandbox...done')
