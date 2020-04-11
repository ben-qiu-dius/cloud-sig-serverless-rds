#!/bin/bash

HOST='https://yitawnfjcl.execute-api.ap-northeast-1.amazonaws.com/dev/'
CONCURRENCY=${1:-250}
NUMBER_OF_REQUESTS=${2:-1000}

# Testing DB write to aurora serverless
echo ""
echo ""
echo "================================ AURORA WRITE LOADTESTING ======================================"
loadtest $HOST -c $CONCURRENCY -n $NUMBER_OF_REQUESTS \
         -P '{"operationName":null,"variables":{},"query":"mutation {\n  auroraCreateUser(input: {Name: \"test\", Posts: [{Text: \"test\"}]}) {\n    UUID\n    Name\n  }\n}\n"}' \


# Testing DB write to postgres
echo ""
echo ""
echo "================================ POSTGRES WRITE LOADTESTING ======================================"
loadtest $HOST -c $CONCURRENCY -n $NUMBER_OF_REQUESTS \
         -P '{"operationName":null,"variables":{},"query":"mutation {\n  postgresCreateUser(input: {Name: \"test\", Posts: [{Text: \"test\"}]}) {\n    UUID\n    Name\n  }\n}\n"}' \


# Testing DB write to postgres with proxy
echo ""
echo ""
echo "================================ PROXY WRITE LOADTESTING ======================================"
loadtest $HOST -c $CONCURRENCY -n $NUMBER_OF_REQUESTS \
         -P '{"operationName":null,"variables":{},"query":"mutation {\n  proxyCreateUser(input: {Name: \"test\", Posts: [{Text: \"test\"}]}) {\n    UUID\n    Name\n  }\n}\n"}' \
