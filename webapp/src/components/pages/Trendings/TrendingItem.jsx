import classnames from 'classnames'
import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dotdotdot from 'react-dotdotdot'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'
import { selectCurrentUser } from 'with-react-redux-login'

import Icon from 'components/layout/Icon'
import articleType  from 'components/types/articleType'
import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'
import { getFormatPublishedDate } from 'utils/moment'

const round = (x, n) => Math.round(x*10**n) / 10**n

const displaySocialScores = socialScore => {
  if (socialScore > 999999){
    return `${round(socialScore/1000000, 1)}M`
  }
  if (socialScore > 999){
    return `${round(socialScore/1000, 0)}k`
  }
  return socialScore
}


const TrendingItem = ({ trending }) => {
  const {
    authors,
    buzzsumoId,
    externalThumbUrl,
    facebookShares,
    publishedDate,
    subdomain,
    title,
    totalShares,
    twitterShares,
    url
  } = trending
  const dispatch = useDispatch()

  const formatPublishedDate = useMemo(() =>
    getFormatPublishedDate(publishedDate), [publishedDate])

  const { id: currentUserId } = useSelector(selectCurrentUser) || {}

  const editorRole = useSelector(state =>
    selectRoleByUserIdAndType(state, currentUserId, 'editor'))
  const canVerdict = typeof editorRole !== 'undefined'

  const [isReviewable, setIsReviewable] = useState(undefined)

  const handleSaveTrending = useCallback(trendingExtraData => () => {
    const body = {
      ...trending,
      ...trendingExtraData
    }

    delete body.id

    setIsReviewable(trendingExtraData && trendingExtraData.isReviewable)

    dispatch(requestData({
      apiPath: '/articles',
      body,
      method: 'POST',
    }))
  }, [dispatch, trending, setIsReviewable])


  return (
    <article className="article-item">
      <div
        className="article-container"
      >
        <div className="article-header">
          <p className="article-date">{formatPublishedDate}</p>
        </div>
        <div className="article-summary">
          <div className="article-summary-thumbnail">
            <img
              alt="Article illustration"
              className="thumbnail-image"
              src={externalThumbUrl}
            />
          </div>
          <div className="article-summary-container">
            <Dotdotdot className="article-title" clamp={4}>
              {title}
            </Dotdotdot>
            <Dotdotdot clamp={2}>
              {((subdomain || authors) || '')
                .split(';')
                .filter(author => author)
                .map(author => (
                  <p className="article-author" key={author}>
                    {author}
                  </p>
                )
              )}
            </Dotdotdot>
            <a
              className="article-link"
              href={url}
              rel="noopener noreferrer"
              target="_blank"
            >
              Read the article
            </a>
          </div>
        </div>
        <div className="social-scores-container">
          <div className="separated-scores">
            <p>
              {displaySocialScores(totalShares)} Share
            </p>
          </div>
          <div className="separated-scores">
            <div className="score">
              <Icon className="icon" name="ico-fb.svg" />
              <p>{displaySocialScores(facebookShares)}</p>
            </div>
            <div className="score">
              <Icon className="icon" name="ico-twtr.svg" />
              <p>{displaySocialScores(twitterShares)}</p>
            </div>
          </div>
        </div>
        <div className="article-cta-container">
          <button
            className={classnames("button is-secondary thin", {
              'is-loading': isReviewable === false
            })}
            onClick={handleSaveTrending({ isReviewable: false })}
            type="button"
          >
            Remove
          </button>
          {canVerdict && (<NavLink
            className="button is-primary thin"
            to={`/verdicts/creation?buzzsumoId=${buzzsumoId}`}
          >
            Select for verdict
          </NavLink>)}
        </div>
      </div>
    </article>
  )
}

TrendingItem.defaultProps = {
  trending: null,
}

TrendingItem.propTypes = {
  trending: articleType,
}

export default TrendingItem
