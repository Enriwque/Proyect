 import logger from './utils/logger.js';
 import app from './app.js';
 import config from './config.js';

 const { port } = config.app;

 app.listen(port, err => {
 if (err) {
 logger.error(err);
 return;
 }
 logger.info(`App listening on port ${port}!`);
 });