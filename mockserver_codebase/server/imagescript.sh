#! /bin/bash

read -p "Did you change the connection url in config.env and server.js file ? (yes/no)" answer

if [[ "$answer" = "y" || "$answer" = "yes" ]]; then
  read -p "Tag-Name (version).. " tag

  echo "Tag-Name: " $tag

  docker build -t jsonserver:$tag .

  docker login

  # tag the image
  docker tag jsonserver:$tag tyskerdocker/jsonserver:$tag

  # push the image to docker hub
  docker push tyskerdocker/jsonserver:$tag
else
  exit
fi
