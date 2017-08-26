FROM vzwingmann/wiringpi:arm
MAINTAINER vincent.zwingmann@github.com

# Copy radioEmission from [here](https://github.com/vzwingma/domotique/blob/master/radioEmission/radioEmission)
COPY radioEmission /data/bin/radioEmission
RUN chmod -R 777 /data/bin