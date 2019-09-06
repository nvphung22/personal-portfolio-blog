const routes = require('next-routes')

module.exports = routes()
.add('portfolio', '/portfolios/:id')
.add('portfolioUpdate', '/portfolios/:id/update')
.add('blogEditor', '/blogs/new')
.add('blogDetail', '/blogs/s/:slug')
.add('blogEditorUpdate', '/blogs/:id/update')

