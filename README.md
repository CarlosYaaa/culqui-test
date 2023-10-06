# Despliegue de Proyecto Serverless en AWS

Este repositorio contiene un proyecto serverless que se puede desplegar en AWS utilizando el framework Serverless Framework. Siga estos pasos para desplegar el proyecto en su propia cuenta de AWS.

## Requisitos Previos

Antes de comenzar, asegúrese de tener lo siguiente instalado en su sistema:

1. [Node.js](https://nodejs.org/) (v10 o superior)
2. [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/) (`npm install -g serverless`)
3. [AWS CLI](https://aws.amazon.com/cli/) configurado con sus credenciales de AWS
4. [Redis] (HOST: 127.0.0.1, PORT: 6379)
## Pasos para Desplegar

1. **Clonar este repositorio**

 ```bash
   git clone https://github.com/CarlosYaaa/rimac-test
   cd rimas-test --CAMBIAR 

2. **Instalar los paquetes de npm**

  Ejecutar el comando npm i

3. **Despliegue en AWS**

  Para desplegar el proyecto en AWS debemos ejecutar el comando "npm run deploy"
  

4. **Ejecución de pruebas unitarias**

  Para ejecutar las pruebas unitarias ejecutaremos el comando "npm test"


5. **Ejecución de la aplicación de manera local**

  Para ejecutar la aplicación de manera local usaremos el siguiente comando "npm run dev"

**ENDPOINTS**

 Una vez desplegado el proyecto habran 2 endpoints lambdas

 1. **Generate Token:**

    Pasa como parametros los datos de la tarjeta y almacena los datos de la misma bajo un token, todo esto se guardara en redis de manera local

    **POST http://localhost:3000/token?token**

    BODY: {
      "email": "carlos.yaringao@gmail.com",
      "card_number": "4111111111111111",
      "cvv": "123",
      "expiration_year": "2026",
      "expiration_month": "12" }
    
    RESPONSE 
    {
      "message": "Datos de tarjeta almacenados correctamente",
      "token": "YBGaqQS8plijeqse"
    }

  2. **Get Data Card**

    Retorna los datos de la tarjeta sin CVV, utlizando el token como autenticador.

    **GET http://localhost:3000/card**

    Authorization Bearer Token { YBGaqQS8plijeqse }

    RESPONSE

    {
    "email": "carlos.yaringao@gmail.com",
    "card_number": "4111111111111111",
    "expiration_year": "2026",
    "expiration_month": "12"
    }
