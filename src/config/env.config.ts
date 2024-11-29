/*
 creamos configuraciones por default (por si el archivo .env no es creado por el desarrollador)
 estas configuraciones sólo pueden ser utilizadas dentro de los buildings block (dentro de la aplicación de Nest, ya que las estamos cargando/estableciendo en el import de app.module)
 entonces si que queremos utilizarlas dentro del archivo main.ts, no han podido ser cargadas aún como var de entorno, solo podremos utilizar las var de entonos globales, definadas en el .env
*/
export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3001,
    defaultLimit: +process.env.DEFAULT_LIMIT || 7,
})

