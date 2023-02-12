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
# FROM node:19.2.0-alpine3.17


# #  esta version de linux ya vienen con una carpeta app para colocar la aplicacion, de igual manera se puede crear otro directorio
# WORKDIR /app

# # copiar y pegar los archivos en la carpeta: ./ hace referencia dentro de la carpeta /app/...
# COPY package.json ./

# # si queremos instalar las dependencias en el archivo package.json:
# # para ejecutar un comando:
# # RUN npm install && npm install ..... && : si son varias instalaciones o comandos necesarios
# RUN npm install

# COPY app.js  ./

# # copiar todos los archivos de una carpeta:
# COPY . .

# # realizando testing a la app  antes de lanzarla :
# RUN npm run test 

# # *** eliminar archivos y directorios no necesarios en PROD: rm -rf = remueve todo de forma recursiva 
# RUN rm -rf test && rm -rf node_modules

# # *** instalar solo dependencias necesarias para PROD
# RUN npm install --prod

# # # comando que se ejecuta cuando se hace el Run de la aplicacion 'docker run -nombre de la imagen- '
# CMD [ "node", "app.js" ]











# *********************************************************   MULTI-STAGE BUILD   ******************************************************************************************************************************** 


# En esta parte dividiremos en multiStage nuestro dicker file para que cada stage se enfocque en hacer una sola cosa:






# *********************************************************   Primera Stage = dependencies  ******************************************************************************************************************************** 



# imagen a utilizar
FROM node:19.2.0-alpine3.17 as dependencies

# directorio donde trabajaremos
WORKDIR /app

# copiamnos al directorio el archivo package.json
COPY package.json ./

# instalamos las dependencias
RUN npm install





# *********************************************************   Segundo Stage = Builder ******************************************************************************************************************************** 

# etapa de testeo y realizar el build

# creamos una imagen aparte de la anterior
FROM node:19.2.0-alpine3.17 as builder

# nos movemos al directorio app de nuestra nueva imagen 
WORKDIR /app

# copiamos el resultado de la primer stage a nuestro directorio 
#        desde         especificar que carpeta  => hacia donde ira
COPY --from=dependencias /app/node_modules /app/node_modules

# copiamos todo lo que este en el principal a nuestro directorio, ignorando lo que se encuentre en el dockerignore

COPY . .

# y ahora podemos correr nuestro test

RUN npm run test



# *********************************************************   Tercera Stage = produccion ******************************************************************************************************************************** 

# etapa para instalar solo dependencias de produccion: 

# creamos una nueva arquitectura, que utilizara la version de node

FROM node:19.2.0-alpine3.17 as produccion 

# nos movemos a su directorio app

WORKDIR /app

# copiamos el package.json con las dependecias necesarias para produccion
COPY  package.json ./
# instalamos solo las dependecias de produccion

RUN npm install --prod


# *********************************************************   Cuarta Stage = Runner ******************************************************************************************************************************** 

# etapa para correr nuestro proyecto, utilizando ek resultado de las anteriores stages: 

# creamos una nueva arquitectura, que utilizara la version de node
FROM node:19.2.0-alpine3.17 as runner 

# nos movemos a su directorio app
WORKDIR /app

# copyamos los archivos necesarios para que nuestra imagen pueda correr:
COPY --from=produccion /app/node_modules /app/node_modules


# copiamos el archivo app.js
COPY  app.js ./

# copiamos lo que se envuentra en la carpeta tasks
COPY  task/  ./task


# corremos nuestra imagen
CMD [ "node", "app.js" ]





