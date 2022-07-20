const routes = require('next-routes')();

routes
    .add('/collections/new', '/collections/new')
    .add('/collections/:address', '/collections/show')
    .add('/collections/:address/audioUploads', '/collections/audioUploads/index')
    .add('/collections/:address/audioUploads/new', '/collections/audioUploads/new');

module.exports = routes;
