# my-1st-blog

building new image:

```
$ docker build --tag malwinakunam/my-1st-blog:latest .
```

pushing innto dockerhub:

```
$ docker push malwinakunam/my-1st-blog:latest
```
To export env
```
$ export MYSQL_HOST="localhost" MYSQL_PORT="63306" MYSQL_USER="root" MYSQL_PASSWORD="Secret123" MYSQL_DATABASE="new_schema_blog"
```
