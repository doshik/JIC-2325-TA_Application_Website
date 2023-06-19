#!/bin/sh

set -e

/minio server /data &

mc --config-folder /root/.mc alias set s3 http://localhost:9000 $MINIO_ACCESS_KEY $MINIO_SECRET_KEY

until mc --config-folder /root/.mc find s3/user-data
do
    mc --config-folder /root/.mc mb s3/user-data
    sleep 1
done

wait