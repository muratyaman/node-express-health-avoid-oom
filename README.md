# node-express-health-avoid-oom

Demo service using Node + Express with improved health check to avoid traffic

## requirements

Node v18.x

## installation

```sh
npm i
```

## configuration

```sh
# copy sample and edit
cp .env_sample.env .env
```

Default settings:

```ini
HTTP_PORT="8080"

# we will warn when hit 90% of this limit
MEMORY_LIMIT_IN_MB="128"

# we will warn when hit 90% of this limit
CONCURRENT_REQUEST_LIMIT="100"
```

## execution

```sh
npm run start

# or:
NODE_OPTIONS=--max-old-space-size=128 node .
```

## usage

You can open multiple terminals and call `/heavy-op` end-point to mimic some operation e.g. it will generate an array (of random objects) with random length between 50k-100k. It will also wait randomly between 15-25 seconds.

```sh
curl http://localhost:8080/heavy-op >> logs/out1.log
curl http://localhost:8080/heavy-op >> logs/out2.log
curl http://localhost:8080/heavy-op >> logs/out3.log

# you can determine length of array of random objects
curl http://localhost:8080/heavy-op/length/90000 >> logs/out4.log

# also you can determine duration to wait before responding
curl http://localhost:8080/heavy-op/length/90000/duration/30000 >> logs/out5.log
```

It should give you time to call it multiple times and also call the `/health` end-point. That looks at the current **memory usage** and the number of **concurrent requests** in progress. If they are over **90%** of the limits set by the environment settings, it will return status code `500`.

```sh
curl http://localhost:8080/health
```

This mechanism can be used by the load balancing system and traffic can be diverted to other service instances. For example; every 10 seconds, the load balancer can run health check, and after 1 "unhealthy" response, it can divert traffic to other hosts. It can also start creating new instances.

The **danger** here is that when the service is marked as unhealthy, it could be destroyed!
