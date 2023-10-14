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

```plain
HTTP_PORT="8080"

# we will warn when hit 90% of this limit
MEMORY_LIMIT_IN_MB="128"

# we will warn when hit 90% of this limit
CONCURRENT_REQUEST_LIMIT="100"
```

## execution

```sh
npm run start

# i.e.
# NODE_OPTIONS=--max-old-space-size=128 node .
```

## call service

```sh
curl http://localhost:8080/heavy-op >> logs/out.log

curl http://localhost:8080/health
```
