#!/bin/bash

HOST='https://yitawnfjcl.execute-api.ap-northeast-1.amazonaws.com/dev/'
CONCURRENCY=${1:-250}
NUMBER_OF_REQUESTS=${2:-1000}

# the below user UUIDs need to be updated before running the scripts
# AURORA_UUID='07e1f7b8-df00-4fb7-be94-af1536325476'
# POSTGRES_UUID='2bbdbe58-1151-4a3e-839a-3a52eb4821be'

# Testing DB read from aurora serverless
echo ""
echo ""
echo "================================ AURORA READ LOADTESTING ======================================"
loadtest $HOST -c $CONCURRENCY -n $NUMBER_OF_REQUESTS \
         -P '{"operationName":null,"variables":{},"query":"{\n  auroraGetUser(uuid: \"07e1f7b8-df00-4fb7-be94-af1536325476\") {\n    UUID\n    Name\n  }\n}\n"}' \


# Testing DB read from postgres
echo ""
echo ""
echo "================================ POSTGRES READ LOADTESTING ======================================"
loadtest $HOST -c $CONCURRENCY -n $NUMBER_OF_REQUESTS \
         -P '{"operationName":null,"variables":{},"query":"{\n  postgresGetUser(uuid: \"2bbdbe58-1151-4a3e-839a-3a52eb4821be\") {\n    UUID\n    Name\n  }\n}\n"}' \


# Testing DB read from postgres with proxy
echo ""
echo ""
# echo "================================ PROXY READ LOADTESTING ======================================"
# loadtest $HOST -c $CONCURRENCY -n $NUMBER_OF_REQUESTS \
#          -P '{"operationName":null,"variables":{},"query":"{\n  proxyGetUser(uuid: \"2bbdbe58-1151-4a3e-839a-3a52eb4821be\") {\n    UUID\n    Name\n  }\n}\n"}' \
