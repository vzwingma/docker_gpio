FROM vzwingmann/wiringpi:arm
MAINTAINER vincent.zwingmann@github.com

RUN echo "Copy recepteurDHT11 from here : https://github.com/vzwingma/domotique/blob/master/receptionDHT11/recepteurDHT11"
COPY recepteurDHT11 /data/bin/recepteurDHT11
RUN chmod -R 777 /data/bin
