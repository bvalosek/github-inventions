TAG = bvalosek/www-inventions
ECR = 404054428023.dkr.ecr.us-east-1.amazonaws.com
SERVICE = bvalosek-www-inventions

build:
	docker build -t $(TAG) .

ship-image: build
	`aws ecr get-login --no-include-email --region us-east-1`
	docker tag $(TAG):latest $(ECR)/$(TAG):latest
	docker push $(ECR)/$(TAG):latest

deploy: ship-image
	aws ecs update-service \
		--region us-east-1 \
		--cluster phatnode \
		--service $(SERVICE) \
		--force-new-deployment
