<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
````
npm install
````
3. Tener Nest CLI instalado
````
npm i -g @nestjs/cli
````
4. Levantar la base de datos
```
docker-compose up -d
or
podman-compose up -d
```
NOTA: el flag -d significa detached mode (modo desacoplado o en segundo plano). Esto quiere decir que los contenedores se iniciarán en segundo plano y no mantendrán la terminal ocupada.
Sin el flag -d, los logs de los contenedores se muestran directamente en la terminal, y esta queda bloqueada hasta que detengas los contenedores (usualmente con Ctrl+C).
5. Clonar el archivo __.env.example__ y renombrar la copia a __.env__
6. LLenar las variables de entorno definidas en el __.env__
7. Ejecutar la aplicación en dev:
```
npm run start:dev
```
8. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v1/seed
```

# Stack usado
  * NestJS
  * MongoDB
