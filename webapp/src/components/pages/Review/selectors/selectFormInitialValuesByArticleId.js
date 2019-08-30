import createCachedSelector from 're-reselect'

import selectCurrentUserTagsByArticleId from './selectCurrentUserTagsByArticleId'
import selectCurrentUserReviewByArticleId from '../../../../selectors/selectCurrentUserReviewByArticleId'

function mapArgsToCacheKey(state, userId, articleId) {
  return `${userId || ''}/${articleId || ''}`
}

export const selectFormInitialValuesByArticleId = createCachedSelector(
  selectCurrentUserReviewByArticleId,
  (state, articleId) => articleId,
  selectCurrentUserTagsByArticleId,
  (review, articleId, reviewTags) => {
    const tagIds = reviewTags && reviewTags.map(tag => tag.id)
    const formInitialValues = Object.assign({
      articleId,
      tagIds
    }, review)

    return formInitialValues
  }
)(mapArgsToCacheKey)

export default selectFormInitialValuesByArticleId