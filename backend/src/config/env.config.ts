
export const EnvConfiguration = () => ( {
    environment : process.env.NODE_ENV || 'dev',
    mongoDB: process.env.MONGO_DB || 'mongodb://localhost:27017/instituto-academico',
    port: process.env.PORT || 5000,
} );
