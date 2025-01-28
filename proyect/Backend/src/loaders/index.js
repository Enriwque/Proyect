import expressLoader from './express.js';

 function init(app, config) {
expressLoader(app, config.security);
 }
export default { init };