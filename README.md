# Sinestesia

a [Sails](http://sailsjs.org) application

## Backend-API

Projeto da disciplina PCS2420 - Laboratório de Engenharia de Software II

## Instalacao

Instalar nodejs
Instalar Git

Instalar sails:

```
sudo npm -g install sails
```

Baixar Projeto:
```
git clone https://github.com/PCS2420/Backend-API.git
```

Instalar dependencias:
```
cd Backend-API
npm install
```

Rodar projeto:
```
sails lift
```

Acesar pelo navegador:
```
localhost:1337
```

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
    host: 'ds035004.mongolab.com',
    port: 35004,
    user: 'sails',
    password: 'sails',
    database: 'sinestesia'
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


