<h1 align="center">Nest challenge</h1>
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
   ```bash
git clone https://github.com/sebastraits/nest_challenge
```
2. Iniciar los contenedores
```bash
docker compose up
```
3. Ejecutar las migraciones
   ```bash
  npm run migration:run
  ```

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

## Contact

Sebastian Nieto - - sebanietodeveloper@gmail.com

Project Link: [https://github.com/sebastraits/nest_challenge](https://github.com/sebastraits/nest_challenge)
