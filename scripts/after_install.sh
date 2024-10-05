#!/bin/bash


cd /home/corp/b2b_frontend_v3
docker --version
docker-compose down || echo "no contanier to down"
aws s3 cp s3://deploymentbucket-whizlabs-prod/b2b_prod/production/b2b-frontend/.env .
chown corp.corp .env
docker-compose up  -d --build