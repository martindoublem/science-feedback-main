import React from 'react'


import PasswordField from 'components/layout/form/fields/PasswordField'
import TextField from 'components/layout/form/fields/TextField'

const FormFields = () => (
  <>
    <input type="hidden" name="name" value="user" />
    <TextField
      id="identifier"
      required
      name="identifier"
      label="login"
      placeholder="Your login email"
      type="email"
    />
    <PasswordField
      id="password"
      required
      name="password"
      label="password"
      placeholder="Your login password"
    />
    {/* <Link className="is-white-text is-underline fs16" to="/mot-de-passe-perdu">
      <span>Mot de passe oublié&nbsp;?</span>
    </Link> */}
  </>
)

export default FormFields
