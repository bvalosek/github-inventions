# github-inventions

Basic website to display previous inventions via github e.g. for an employer

## Usage

Provide the following environment variables:

```
TOKEN=123-yourgithubtoken-123
NAME=Brandon Valosek
EMPLOYER=Legit Inc.
ROOT=/inventions/legit
USER=bvalosek
WEBSITE=https://bvalosek.com
```

Build and run this docker image (with the above environment variables set)

```
$ docker build -t bvalosek/github-inventions .
```

## License

MIT

