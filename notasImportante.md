
# al crear nuestro nest nos aparecen warning en algunos archivos para que no suceda en este proyecto de aprendizaje eliminamos de nuestro proyecto algunos comando de nuestro package.json (prettier y otros)

## Levantar base de datos
`docker compose up -d`

## Para correr el backend 
`npm run start:dev`

## Para crear un auth mediante nest cli
`nest g resource auth` 

## Para usar mongo con nest
`npm i @nestjs/mongoose mongoose`
Despues se agrega en el appmodule en la parte de imports
`MongooseModule.forRoot('mongodb://localhost/nest')` // Para mas info en la pag de nest / techniques / mongo 
## Cambiamos el localhost:27017

# Creamos nuestra variable de entorno .env
# Para usar nuestra variable de entorno
1. npm i @nestjs/config
2. En nuestro app.module agregar la configuracion en los imports `ConfigModule.forRoot()` esto va ante que nuestro mongomodule.
3. Cambiamos nuestro localhost por la variable de entorno ``process.env.MONGO_URI``