# Image docker WiringPi

## Téléchargement depuis Docker Hub
      docker pull vzwingmann/wiringpi:arm

## Construction de l'image
      docker build -t vzwingmann/wiringpi:arm .

## Exécution du conteneur 
      docker run --name=dht11 -d \
		--privileged \
		-p 9000:9000 \
		-p 9100:9100 \
		-v $HOME_PATH/:/data/bin \
		--device /dev/ttyAMA0:/dev/ttyAMA0 \
		--device /dev/mem:/dev/mem \
		-it vzwingmann/wiringpi:arm
    
où 
- `$HOME_PATH/executable` : Répertoire vers les exécutables

## Utilisation

Le conteneur expose 2 routes :

### Information 

   [http://url-conteneur:9100/_info](http://url-conteneur:9100/_info)

donne la réponse HTTP\200	  
	  
      Le moteur de commande GPIO est fonctionnel
	  
### Commande

   [http://url-conteneur:9000/nom_exécutable](http://url-conteneur:9000/nom_exécutable)

donne la réponse HTTP\20 et renvoie le résultat de l'exécution de l'exécutable
