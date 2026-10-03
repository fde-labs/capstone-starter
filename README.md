# Capstone starter

The smallest service that proves the deployment path works: source, container
image, registry, Cloud Run, URL. Clone it, change one file, push, and watch your
own copy go live.

No dependencies, so it builds without an install step and there is nothing to
understand before you can change something.

## Run it locally

```bash
node server.js          # then open http://localhost:8080
```

## Build the container the way the platform does

```bash
docker build -t capstone-starter .
docker run -p 8080:8080 capstone-starter
```

## The one thing worth reading

`Dockerfile` listens on `$PORT` and binds `0.0.0.0`. A service bound to
`localhost` works on your machine and fails on Cloud Run with no useful error,
which is the most common way a first deploy goes wrong.

`/health` returns `ok` for anything that wants to check the process is up.

Deliberately not `/healthz`: Cloud Run intercepts that exact path and answers
404 itself, so a handler on it never runs. It works locally and fails in
production, which is a confusing way to lose an afternoon.
