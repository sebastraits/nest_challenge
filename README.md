<div align='center'>

<h1>Challenge</h1>
<p>Challenge para Sooft</p>

<h4> <span> · </span> <a href="https://github.com/sebastraits/nest_challenge/blob/master/README.md"> Documentation </a> <span> · </span> <a href="https://github.com/sebastraits/nest_challenge/issues"> Report Bug </a> <span> · </span> <a href="https://github.com/sebastraits/nest_challenge/issues"> Request Feature </a> </h4>


</div>

# :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
- [FAQ](#grey_question-faq)
- [Contact](#handshake-contact)


## :star2: About the Project
<details> <summary>Server</summary> <ul>
<li><a href="https://nestjs.com">Nest.JS</a></li>
<li><a href="https://swagger.io">Swagger</a></li>
<li><a href="https://jestjs.io">Jest</a></li>
</ul> </details>
<details> <summary>Database</summary> <ul>
<li><a href="https://www.mysql.com">Mysql</a></li>
<li><a href="https://typeorm.io">TypeORM</a></li>
</ul> </details>
<details> <summary>DevOps</summary> <ul>
<li><a href="https://www.docker.com">Docker</a></li>
</ul> </details>

### :dart: Features
- Tests unitarios
- Pipes
- Documentación
- Typescript


## :toolbox: Getting Started

### :gear: Installation

Clonar el repositorio
```bash
git clone https://github.com/sebastraits/nest_challenge
```


### :test_tube: Running Tests

Ejecutar las pruebas unitarias
```bash
npm run test
```


### :running: Run Locally

Clone the project

```bash
https://github.com/sebastraits/nest_challenge
```
Iniciar docker compose
```bash
docker compose up
```
Ejecutar las migraciones (Incluyen datos para facilitar las pruebas)
```bash
npm run migration:run
```


## :grey_question: FAQ

- Los EP que filtran por 30 dias podrian ser mas flexibles?
- Si. Podríamos pasar la cantidad de días como parámetro del EP si se requiriera mas flexibilidad.


## :handshake: Contact

Sebastian Nieto - - sebanietodeveloper@gmail.com

Project Link: [https://github.com/sebastraits/nest_challenge](https://github.com/sebastraits/nest_challenge)

<h1 align="center">Sooft challenge</h1>
<p align="center"><a href="#Enunciado">Enunciado</a> - <a href="#Instalación">Instalación</a> - <a href="#technology-stack">Stack tecnologico</a>- <a href="#API">API</a></p>

## Enunciado

Generar los siguientes 3 endpoints:

- Uno que traiga las empresas que hicieron transferencias el último mes
- Otro que traiga las empresas que se adhirieron el último mes.
- El último que haga la adhesión de una empresa.

Deseable: usar arquitectura hexagonal (o el servicio con el que te sientas más comodo)
Base: puede usarse relacional o no relacional
Datos de la empresa: CUIT, Razón Social, Fecha Adhesión
Datos de la transferencia: Importe, Id Empresa, Cuenta Débito, Cuenta Crédito
Asumir las dudas y cuando envías el texto comentarlas.
Realizar pruebas unitarias.

## Instalación

1. Clonar el repositorio
2. Ejecutar el comando 'docker compose up'
3. Ejecutar el comando 'npm run migration:run'

(.env se incluye ya que es un aplicación de prueba y no contiene datos sensibles)

## Tech Stack

**Backend**: Nest.js, Typescript
**Base de Datos**: MySQL, TypeORM
**Documentación**: Swagger
**Test**: Jest

## API

**Swagger**: http://localhost:3000/api

1. **POST**: http://localhost:3000/company/
2. **GET**: http://localhost:3000/company/with-recent-transfers
3. **GET**: http://localhost:3000/company/recently-added
