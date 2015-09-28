# Sinestesia

a [Sails](http://sailsjs.org) application

## Backend-API

Projeto da disciplina PCS2420 - Laboratório de Engenharia de Software II

## Instruções

### Passos realizados para a criação do projeto com a configuração inicial

Instalar nodejs
Instalar mongodb

Instalar Sails: 

```
sudo npm -g install sails
```

Criar novo projeto sails

```
sails new Sinestesia
```

Configurar banco de dados 

```
cd Sinestesia
sudo npm isntall sails-mongo --save
```

No arquivo config/connections.js

```
MongodbServer: {
	adapter: 'sails-mongo',
	host: 'localhost',
	port: 27017,
	// user: 'username',
	// password: 'password',
	database: 'sinestesia_db'
},
``` 

No arquivo config/models.js

```
modules.exports.models = {
	connection: 'MongodbServer',
	migrate: 'alter'
}
```

Inicializar aplicação

```
Sails lift
```
Abrir browser

```
localhost:1337
```
#Criação de API

Para criar um novo model e api basta executar o comando:

```
sails generate api user
```


