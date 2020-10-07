## Setting the environment for:

### Running in DEVELOPMENT mode

target file: config/development.json.sample

- change the filename to development.json and hardcode the environment variables values to be used in development

```
{
"jwtPrivateKey": <jwt key>,
"mongoURI": <mongodb connection string>,
"pgURL": <postgres connection string>,
"PORT": <port to the server on>
}
```

- `set NODE_ENV=development` in default.js or in the environment to use these configurations

warning : hardcoded configurations will be overridden if the environment variables are set

### Running in PRODUCTION mode

target file: config/production.json.sample

- change the filename to production.json and hardcode the environment variables values to be used in production

```
{
"jwtPrivateKey": <jwt key>,
"mongoURI": <mongodb connection string>,
"pgURL": <postgres connection string>,
"PORT": <port to the server on>
}
```

- `set NODE_ENV=production` in default.js or in the environment to use these configurations

warning : hardcoded configurations will be overridden if the environment variables are set

## Additional Info

### default.json

config/default.json contains the common variables for all the environments, variables are hardcoded

warning : hardcoded configurations will be overridden if the environment variables are set

### custom-environment-variables.json

config/custom-environment-variables.json

gets the configuration data from the environment variables

```
{
<key1>:<value>,
<key2>:<value>,
}
```

key = key to be used in the app

value = actual name of the env variable

```
const config = require("config");
var <variable_name> = config.get('key1');
```
