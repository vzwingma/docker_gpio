# Image docker WiringPi - DHT11

Le conteneur expose une API de commande du binaire [recepteurDHT11](https://github.com/vzwingma/domotique/blob/master/receptionDHT11/recepteurDHT11) afin de renvoyer les valeurs de température et d'humidité du capteur DHT11

Plus d'informations sur le [Wiki du projet](https://github.com/vzwingma/domotique/wiki/_Module-Temp%C3%A9rature)

## Téléchargement depuis Docker Hub
      docker pull vzwingmann/wiringpi:arm-dht11

## Construction de l'image
      docker build -t vzwingmann/wiringpi:arm-dht11 .

## Exécution du conteneur 
      docker run --name=dht11 -d \
		--privileged \
		-e "APP_NAME=DHT11"
		-p 9000:9000 \
		-p 9100:9100 \
		--device /dev/ttyAMA0:/dev/ttyAMA0 \
		--device /dev/mem:/dev/mem \
		-it vzwingmann/wiringpi:arm-dht11

## Utilisation

Le conteneur expose 2 routes :

### Information 

   [http://url-conteneur:9100/_info](http://url-conteneur:9100/_info)

donne la réponse HTTP\200	  
	  
      Le moteur de commande GPIO est fonctionnel
	  
### Commande

   [http://url-conteneur:9000/cmd/recepteurDHT11](http://url-conteneur:9000/cmd/recepteurDHT11)

donne la réponse HTTP\200 et renvoie le résultat de l'exécution de l'exécutable `recepteurDHT11`
