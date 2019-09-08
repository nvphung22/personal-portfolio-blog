const routes = require('next-routes')

module.exports = routes()
.add('portfolioNew', '/portfolios/new')
.add('portfolio', '/portfolios/:id')
.add('portfolioUpdate', '/portfolios/:id/update')
.add('blogEditor', '/blogs/new')
.add('userBlogs', '/blogs/dashboard')
.add('blogDetail', '/blogs/s/:slug')
.add('blogEditorUpdate', '/blogs/:id/update')

