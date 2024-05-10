
# Al crear nuestro nest nos aparecen warning en algunos archivos para que no suceda en este proyecto de aprendizaje eliminamos de nuestro proyecto algunos comando de nuestro package.json (prettier y otros)

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

# user.entity agregamos la configuracion de las prop de nuestra variables y exportamos

# En auth.module importamos y agregamos la configuracion hecha

# Creamos nuestro create-user.dto.ts y arreglamos los errores que ocaciona cambiar el nombre

# Hacemos un `npm i class-validator class-transformer` y agregamos a la configuracion global en main.ts

app.useGlobalPipes(
 new ValidationPipe({
 whitelist: true,
 forbidNonWhitelisted: true,
 })
);

-- Con esto solo recibimos datos de las variables que establecimos, como por ej name y no nombre

# En nuestro create-user.dto podemos usar validadores de datos


# Para encriptar nuestros datos en una sola via
`npm i bcryptjs`
Importamos en nuestro auth service y realizamos el siguiente comando
`npm i --save-dev @types/bcryptjs`