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

  const cfg = makeConfig(penv);

  const memoryTracker   = new MemoryTracker(cfg);
  const requestCounter  = new RequestCounter(cfg);
  const requestRejector = new RequestRejector({ memoryTracker, requestCounter });

  app.use(requestCounter.makeMiddleware());

  // after health check & being busy, is we still receive request, reject it
  app.use(requestRejector.makeMiddleware());

  const healthCheck = makeHealthCheck({ requestCounter, memoryTracker });
  app.get('/health', healthCheck);

  const heavyOp = makeHeavyOp(cfg);
  app.get('/heavy-op', heavyOp);
  app.post('/heavy-op', heavyOp);

  return {
    app,
    cfg,

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
