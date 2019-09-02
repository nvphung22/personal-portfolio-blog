const routes = require('next-routes')

module.exports = routes()
.add('portfolio', '/portfolios/:id')
.add('portfolioUpdate', '/portfolios/:id/update')
.add('blogEditorUpdate', '/blogs/:id/update')

