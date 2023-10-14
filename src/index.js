const { factory } = require('./factory');

require('dotenv').config();

main();

async function main() {
  const { app, config } = factory(process.env);

  app.listen(config.httpPort, () => {
    console.log('ready at', config.httpPort);
  });

  return app;
}
