FROM hypriot/wiringpi
MAINTAINER vincent.zwingmann@github.com
RUN apt-get update
RUN apt-get install -y node npm
RUN npm install express --save \
	npm install child_process --save \
	npm install body-parser --save

COPY node_modules /data/node_modules
COPY server.js /data/server.js

EXPOSE 9000
EXPOSE 9100

ENTRYPOINT ["nodejs", "server"]