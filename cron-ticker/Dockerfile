# npm i node-cron : se utiliza para la automatizacion de procesos. Procesos de sincronizacion

# # construccion de las instrucciones que mecesita mi App para funcionar : son todas las dependencias incluyendo sistemas operativos necesarios
# # FROM baseImage: imagen base a utilizar: esta es una version de linex con node instalado importante!.
# FROM node:19.2.0-alpine3.17

# #  esta version de linux ya vienen con una carpeta app para colocar la aplicacion, de igual manera se puede crear otro directorio
# WORKDIR /app

# # copiar y pegar los archivos en la carpeta: ./ hace referencia dentro de la carpeta /app/...
# COPY app.js package.json ./

# # si queremos instalar las dependencias en el archivo package.json:
# # para ejecutar un comando:
# # RUN npm install && npm install ..... && : si son varias instalaciones o comandos necesarios

# RUN npm install



# # comando que se ejecuta cuando se hace el Run de la aplicacion 'docker run -nombre de la imagen- '
# CMD [ "node", "app.js" ]

# ************************************************* Ordenando segun sus posibles cambios: ******************************************************


# construccion de las instrucciones que mecesita mi App para funcionar : son todas las dependencias incluyendo sistemas operativos necesarios
# FROM baseImage: imagen base a utilizar: esta es una version de linex con node instalado importante!.
#  FROM --platform=arm64 node:19.2.0-alpine3.17 => tambien podemos especificar a que arquitectura vamos, en este caso : --platform=arm64
# FROM node:19.2.0-alpine3.17

# /////////////  UTILIZANDO BUILDX   ///////////////  FROM --platform=$BUILDPLATFORM node:19.2.0-alpine3.17 : de esta manera decimos que va a utilizar la plataforma que contenga nuestro buildx
#  FROM --platform=$BUILDPLATFORM node:19.2.0-alpine3.17 

# UTILIZANDO BUILDX PARA SUBIR Y CREAR (OPCIONAL) UNA IMAGEN Y SUS DIFERENTES PLATAFORMAS:  se hace con el comando : docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t  jestebandeveloper/cron-ticker:"nombreimagen" --push .
FROM node:19.2.0-alpine3.17


#  esta version de linux ya vienen con una carpeta app para colocar la aplicacion, de igual manera se puede crear otro directorio
WORKDIR /app

# copiar y pegar los archivos en la carpeta: ./ hace referencia dentro de la carpeta /app/...
COPY package.json ./

# si queremos instalar las dependencias en el archivo package.json:
# para ejecutar un comando:
# RUN npm install && npm install ..... && : si son varias instalaciones o comandos necesarios
RUN npm install

COPY app.js  ./

# copiar todos los archivos de una carpeta:
COPY . .

# realizando testing a la app  antes de lanzarla :
RUN npm run test 

# *** eliminar archivos y directorios no necesarios en PROD: rm -rf = remueve todo de forma recursiva 
RUN rm -rf test && rm -rf node_modules

# *** instalar solo dependencias necesarias para PROD
RUN npm install --prod

# # comando que se ejecuta cuando se hace el Run de la aplicacion 'docker run -nombre de la imagen- '
CMD [ "node", "app.js" ]
