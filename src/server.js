let { port } = require('./configs/server.config');
const app = require('./app');
port = port || 5000;
/**
 * listening to port below
 */
app.listen(port, () => console.log(`Example app listening on ${port} port!`));