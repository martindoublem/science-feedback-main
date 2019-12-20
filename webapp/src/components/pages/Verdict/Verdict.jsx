import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'
import { Form } from 'react-final-form'
import { NavLink } from 'react-router-dom'
import { requestData } from 'redux-thunk-data'

import ArticleItemContainer from 'components/layout/ArticleItem/ArticleItemContainer'
import HeaderContainer from 'components/layout/Header/HeaderContainer'
import MainContainer from 'components/layout/Main/MainContainer'
import getCanSubmit from 'utils/form/getCanSubmit'
import parseSubmitErrors from 'utils/form/parseSubmitErrors'
import { articleNormalizer, verdictNormalizer } from 'utils/normalizers'

import FormFooterContainer from './FormFooter/FormFooterContainer'
import FormFieldsContainer from './FormFields/FormFieldsContainer'
import ReviewersManagerContainer from './ReviewersManager/ReviewersManagerContainer'

const Verdict = ({
  article,
  currentUserVerdictPatch,
  dispatch,
  form: { isCreatedEntity, method },
  history,
  isPending,
  match: { params: { verdictId } },
  query: { getParams },
}) => {
  const { articleId } = getParams()


  const handleSubmitVerdict = useCallback(formValues => {
    const { id } = currentUserVerdictPatch || {}
    const apiPath = `/verdicts/${id || ''}`
    return new Promise(resolve => {
      dispatch(requestData({
        apiPath,
        body: { ...formValues },
        handleFail: (state, action) => {
          const { payload } = action
          const errors = parseSubmitErrors(payload.errors)
          resolve(errors)
        },
        handleSuccess: (state, action) => {
          const { payload: { datum } } = action
          const createdVerdictId = datum.id
          resolve()
          const nextUrl = `/verdicts/${createdVerdictId}`
          history.push(nextUrl)
        },
        method
      }))
    })
  }, [currentUserVerdictPatch, history])


  useEffect(() => {
    dispatch(requestData({ apiPath: '/evaluations' }))
    dispatch(requestData({ apiPath: '/tags' }))

    if (!isCreatedEntity) {
      dispatch(requestData({
        apiPath: `/verdicts/${verdictId}`,
        isMergingDatum: true,
        normalizer: verdictNormalizer,
      }))
      return
    }

    if (!articleId) {
      return
    }

    dispatch(requestData({
      apiPath: `/articles/${articleId}`,
      normalizer: articleNormalizer,
    }))
  }, [articleId, verdictId])


  useEffect(() => {
    const { id } = currentUserVerdictPatch || {}
    if (isCreatedEntity && id) {
      history.push(`/verdicts/${id}?modification`)
    }
  })


  const renderForm = useCallback(formProps => {
    const canSubmit = !isPending && (
      isCreatedEntity ||
      getCanSubmit(formProps)
    )
    const { form, handleSubmit } = formProps
    return (
      <form
        autoComplete="off"
        className="form flex-rows is-full-layout"
        disabled={isPending}
        noValidate
        onSubmit={event => event.preventDefault && handleSubmit(event)}
      >
        {!isCreatedEntity && <FormFieldsContainer />}
        <FormFooterContainer
          canSubmit={canSubmit}
          form={form}
        />
      </form>
    )
  }, [isPending])


  return (
    <>
      <HeaderContainer />
      <MainContainer name="verdict">
        <div className="container">
          <section className="hero">
            <h1 className="title">
              {isCreatedEntity ? 'Create your verdict' : 'See the verdict'}
            </h1>
          </section>

          {article && (
            <section>
              <h2 className="subtitle flex-columns items-center">
                <span>
                  REVIEWED ARTICLE
                </span>
                <span className="flex-auto" />
                <NavLink
                  className="button is-primary right"
                  to={`/articles/${articleId}`}
                >
                  See article
                </NavLink>
              </h2>
              <ArticleItemContainer article={article} noControl />
            </section>
          )}

          {!isCreatedEntity && (
            <section>
              <h2 className="subtitle flex-columns items-center">
                REVIEWERS
              </h2>
              <ReviewersManagerContainer />
            </section>
          )}

          <section>
            {!isCreatedEntity && (
              <h2 className="subtitle flex-columns items-center">
                VERDICT DETAILS
              </h2>
            )}
            <Form
              initialValues={currentUserVerdictPatch}
              onSubmit={handleSubmitVerdict}
              render={renderForm}
            />
          </section>
        </div>
      </MainContainer>
    </>
  )
}

Verdict.defaultProps = {
  article: null,
  currentUserVerdictPatch: null,
  isPending: false
}

Verdict.propTypes = {
  article: PropTypes.shape(),
  currentUserVerdictPatch: PropTypes.shape(),
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.shape({
    isCreatedEntity: PropTypes.bool.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  isPending: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape().isRequired
  }).isRequired,
  query: PropTypes.shape().isRequired
}

export default Verdict
