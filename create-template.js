import standard from './templates/standard.js'

const createTemplate = (args = {}) => {
  const {
    template = standard,
    domains,
    root,
    port
  } = args
  return template({
    domains,
    root,
    port
  })
}

export default createTemplate
