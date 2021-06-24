function loadEnvVariables(key){
    const varEnv = process.env[key];

    if(!varEnv){
        throw new Error(`This app requires ${key} in order to be executed`);
    }

    return varEnv;
}

function loadArrayEnvVariables(key){
    return loadEnvVariables(key).split(",");
}

module.exports = {
    postgresURI: loadEnvVariables('POSTGRES_URI'),
    sessionSecret: loadArrayEnvVariables('SESSION_SECRET')
};