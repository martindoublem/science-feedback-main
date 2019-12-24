import createCachedSelector from 're-reselect'

function mapArgsToCacheKey(state, key, tags) {
  return `${key} ${tags.map(tag => tag).join(' ')}`
}

export default createCachedSelector(
  (state, key) => state.data[key],
  (state, key, tags) => tags,
  (entities, tags) => {
    const tagsLength = tags.length
    return entities.filter(entity =>
      tags.length === entity.__ACTIVITIES__.length
      && tags.every(tag => entity.__ACTIVITIES__.includes(tag)))
  }
)(mapArgsToCacheKey)
