from sqlalchemy import BigInteger, Column, ForeignKey
from sqlalchemy.orm import backref, relationship
from sqlalchemy_handler import Handler

from models.utils.db import Model

class UserArticle(Handler, Model):

    userId = Column(BigInteger,
                    ForeignKey('user.id'),
                    primary_key=True)

    user = relationship('User',
                        foreign_keys=[userId],
                        backref=backref("userArticles"))

    articleId = Column(BigInteger,
                       ForeignKey('article.id'),
                       primary_key=True)

    article = relationship('Article',
                           foreign_keys=[articleId],
                           backref=backref("userArticles"))
