import { connect } from 'react-redux'

import ReviewItem from './ReviewItem'
import {
  selectArticleById,
  selectEvaluationById,
  selectTagsByReviewId,
  selectUserById,
} from '../../../../../selectors'

const mapStateToProps = (state, ownProps) =>  {
  const { review } =  ownProps
  const { articleId, id, evaluationId, userId } = review

  return {
    article: selectArticleById(state, articleId),
    evaluation: selectEvaluationById(state, evaluationId),
    tags: selectTagsByReviewId(state, id),
    user: selectUserById(state, userId),
  }
}

export default connect(mapStateToProps)(ReviewItem)
