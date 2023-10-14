const express = require('express');
const { RequestCounter } = require('./request-counter');
const { MemoryTracker } = require('./memory-tracker');
const { RequestRejector } = require('./request-rejector');
const { makeHealthCheck } = require('./health-check');
const { makeConfig } = require('./config');
const { makeHeavyOp } = require('./heavy-op');

function factory(penv = process.env) {
  const app = express();

  app.use(express.json());

  const config = makeConfig(penv);

  const memoryTracker   = new MemoryTracker(config);
  const requestCounter  = new RequestCounter(config);
  const requestRejector = new RequestRejector({ memoryTracker, requestCounter });

  app.use(requestCounter.makeMiddleware());

  // after health check & being busy, are we still receiving a request; if so, reject it!
  app.use(requestRejector.makeMiddleware());

  const healthCheck = makeHealthCheck({ config, requestCounter, memoryTracker });
  app.get('/health', healthCheck);

  const heavyOp = makeHeavyOp(config);
  app.get('/heavy-op/length/:length/duration/:duration', heavyOp);
  app.get('/heavy-op/length/:length', heavyOp);
  app.get('/heavy-op', heavyOp);
  app.post('/heavy-op', heavyOp);

  return {
    app,
    config,

    memoryTracker,
    requestCounter,
    requestRejector,

    routes: {
      healthCheck,
      heavyOp,
    },
  };
}

module.exports = { factory };
