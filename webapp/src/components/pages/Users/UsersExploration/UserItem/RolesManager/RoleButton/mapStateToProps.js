import { selectRoleByUserIdAndType } from '../../../../../../../selectors'

const mapStateToProps = (state, ownProps) => {
  const { roleType, user } = ownProps
  const { id: userId } = user
  const role = selectRoleByUserIdAndType(state, userId, roleType)
  return {
    role
  }
}

export default mapStateToProps
