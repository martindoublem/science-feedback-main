import React from 'react'
import { Redirect } from 'react-router-dom'

import ArticleContainer from '../components/pages/Article/ArticleContainer'
import ArticlesContainer from '../components/pages/Articles/ArticlesContainer'
import HomeContainer from '../components/pages/Home/HomeContainer'
import ReviewContainer from '../components/pages/Review/ReviewContainer'
import ReviewsContainer from '../components/pages/Reviews/ReviewsContainer'
import UserContainer from '../components/pages/User/UserContainer'
import UsersContainer from '../components/pages/Users/UsersContainer'
import VerdictContainer from '../components/pages/Verdict/VerdictContainer'
import VerdictsContainer from '../components/pages/Verdicts/VerdictsContainer'
import SigninContainer from '../components/pages/Signin/SigninContainer'
import SignupContainer from '../components/pages/Signup/SignupContainer'
import TrendingsContainer from '../components/pages/Trendings/TrendingsContainer'

const routes = [
  {
    exact: true,
    path: '/',
    render: () => <Redirect to="/home" />,
  },
  {
    exact: true,
    path: '/articles/:articleId',
    render: () => <ArticleContainer />,
    title: 'Article',
  },
  {
    exact: true,
    path: '/articles',
    render: () => <ArticlesContainer />,
    title: 'Articles',
  },
  {
    exact: true,
    path: '/home',
    render: () => <HomeContainer />,
    title: 'Home',
  },
  {
    exact: true,
    path: '/reviews/:reviewId',
    render: () => <ReviewContainer />,
    title: 'Review',
  },
  {
    exact: true,
    path: '/reviews',
    render: () => <ReviewsContainer />,
    title: 'Reviews',
  },
  {
    exact: true,
    path: '/users/:userId',
    render: () => <UserContainer />,
    title: "User",
  },
  {
    exact: true,
    path: '/users',
    render: () => <UsersContainer />,
    title: "Users",
  },
  {
    exact: true,
    path: '/verdicts/:verdictId',
    render: () => <VerdictContainer />,
    title: "Verdict",
  },
  {
    exact: true,
    path: '/verdicts',
    render: () => <VerdictsContainer />,
    title: "Verdicts",
  },
  {
    exact: true,
    path: '/signin',
    render: () => <SigninContainer />,
    title: 'Signin',
  },
  {
    exact: true,
    path: '/signup',
    render: () => <SignupContainer />,
    title: 'Signup',
  },
  {
    exact: true,
    path: '/trendings',
    render: () => <TrendingsContainer />,
    title: 'Trendings',
  },
]

export default routes
