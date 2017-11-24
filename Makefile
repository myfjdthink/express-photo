NAME=express-photo
TAG=latest

build:
	echo building ${NAME}:${TAG}
	docker build -t ${NAME}:${TAG} .

test:
	docker run -d --name ${NAME} --restart=always \
	-e MONGO_URL="mongodb://119.29.57.64:57017/resultdb" \
	-p 8000:3000 \
	-v ~/docker-data:/data \
	${NAME}:${TAG}
