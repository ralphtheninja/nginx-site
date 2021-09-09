import standard from './templates/standard.js'

const createTemplate = (args = {}) => {
  const {
    template = standard,
    domains,
    root,
    port,
    index
  } = args
  return template({
    domains,
    root,
    port,
    index
  })
}

export default createTemplate
