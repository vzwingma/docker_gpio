# Image docker WiringPi - Radio

Le conteneur expose une API de commande du binaire [radioEmission](https://github.com/vzwingma/domotique/blob/master/radioEmission/radioEmission) afin de commander les interrupteurs par radio

Plus d'informations sur le [Wiki du projet](https://github.com/vzwingma/domotique/wiki/_Module-Radio)

## Téléchargement depuis Docker Hub
      docker pull vzwingmann/wiringpi:arm-radio

## Construction de l'image
      docker build -t vzwingmann/wiringpi:arm-radio .

## Exécution du conteneur 
      docker run --name=radio -d \
		--privileged \
		-p 9001:9000 \
		-p 9101:9100 \
		-e "APP_NAME=Radio" \
		--device /dev/ttyAMA0:/dev/ttyAMA0 \
		--device /dev/mem:/dev/mem \
		-it vzwingmann/wiringpi:arm-radio

## Utilisation

Le conteneur expose 2 routes :

### Information 

   [http://url-conteneur:9100/_info](http://url-conteneur:9100/_info)

donne la réponse HTTP\200	  
	  
      Le moteur de commande GPIO est fonctionnel
	  
### Commande

   [http://url-conteneur:9000/cmd](http://url-conteneur:9000/cmd)

donne la réponse HTTP\200 et renvoie le résultat de l'exécution de la commande
