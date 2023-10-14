const { factory } = require('./factory');

require('dotenv').config();

main();

async function main() {
  const { app, cfg } = factory(process.env);

  app.listen(cfg.httpPort, () => {
    console.log('ready at', cfg.httpPort);
  });

  return app;
}
