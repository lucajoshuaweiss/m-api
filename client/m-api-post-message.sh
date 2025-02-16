#!/bin/bash

curl -X POST \
  http://localhost:8080/chat \
  -H 'Content-Type: application/json' \
  -d '{"user": "'"$1"'", "message": "'"$2"'"}'
