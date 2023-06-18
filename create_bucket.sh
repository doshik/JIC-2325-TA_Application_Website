#!/bin/sh

set -eu

# Wait for MinIO to start
until (echo >/dev/tcp/s3/9000) &>/dev/null; do
    sleep 5
done

# Create the bucket if it does not already exist
mc config host add myminio http://s3:9000 minio minio123
mc mb --ignore-existing myminio/mybucket

# Keep the container running in the foreground
exec "$@"