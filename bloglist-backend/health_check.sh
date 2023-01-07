#!/bin/bash

echo "Checking health"

CHECK_RESULT=$(curl "http://localhost:3003/health")
EXPECTED_RESULT="ok"

if [ "$CHECK_RESULT" = "$EXPECTED_RESULT" ]; then
  echo "Health check successful"
  exit 0
else
  echo "Health check failed"
  exit 1
fi
