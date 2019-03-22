import withLogin from 'with-login'

export const withRedirectToSigninWhenNotAuthenticated = withLogin({
  failRedirect: ({ location }) => {
    const { pathname, search } = location
    const fromUrl = encodeURIComponent(`${pathname}${search}`)
    return `/signin?from=${fromUrl}`
  },
  isRequired: true,
})

export default withRedirectToSigninWhenNotAuthenticated
