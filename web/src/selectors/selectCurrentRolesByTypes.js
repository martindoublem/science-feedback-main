import createCachedSelector from 're-reselect'
import { selectCurrentUser } from 'with-login'

function mapArgsToCacheKey(state, types) {
  return (types || []).join(',')
}

export const selectCurrentRolesByTypes = createCachedSelector(
  selectCurrentUser,
  (state, types) => types,
  (currentUser, types) => types && ((currentUser && currentUser.roles) || [])
    .filter(role => types.includes(role.type))
)(mapArgsToCacheKey)

export default selectCurrentRolesByTypes
