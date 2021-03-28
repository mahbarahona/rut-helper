# Rut Helper

rut-helper es una librería javascript para manipular Ruts chilenos.

## Installation

Utiliza NPM para instalar la libreria

```sh
npm install rut-helper
```

## Que puedes hacer?

- Validar RUT
- Fomatear RUT
- Limpiar RUT
- Validar si el formato del RUT es valido
- Obtener el digito verificador correspondiente a un RUT
- Obtener el RUT sin digito verificador
- Obtener el digito verificador de un RUT
- Obtener todas las funciones anteriores en un solo llamado

## Como utilizar

```js
//Opcion 1 : importar todas las funciones
const rh = require("rut-helper");

//Opcion 2 : importar solo las funciones que consideres que necesitas
const {
  extractRut,
  extractDv,
  isFormatoRutValido,
  isRutValido,
  isDvValido,
  getCleanRut,
  getValidDV,
  getRutFormato,
  getRutStatus,
} = require("rut-helper");
```

### extractRut

Devuelve RUT de un RUT entregado (con digito verificador)

```js
const { extractRut } = require("rut-helper");

const rutUsuario = "12.345.678-9";

const rut_sinDv = extractRut(rutUsuario); //output:12345678
```

### extractDv

Devuelve el dígito verificador(dv) de un RUT entregado

```js
const { extractDv } = require("rut-helper");

const rutUsuario = "12.345.678-9";

const dv = extractDv(rutUsuario); //output: 9
```

### isFormatoRutValido

Valida que el RUT entregado tiene una estructura valido

```js
const { isFormatoRutValido } = require("rut-helper");

const rutCliente = "a2.345.678-9"; //estructura no valida

if (!isFormatoRutValido(rutCliente)) {
  //tu codigo
}
```

### isRutValido

Valida que el RUT entregado(con digito verificador) sea válido.

```js
const { isRutValido } = require("rut-helper");

const rutUsuario = "12.345.678-9"; //rut invalido

if (!isRutValido(rutUsuario)) {
  //tu codigo
}
```

### isDvValido

Valida que el digito verificador del RUT entregado sea válido

```js
const { isDvValido } = require("rut-helper");

const rutUsuario = "12.345.678-9"; //rut invalido

if (!isDvValido(rutUsuario)) {
  //tu codigo
}
```

### getCleanRut

Devuelve el rut entregado sin puntos, espacios,guiones y en mayúscula

```js
const { getCleanRut } = require("rut-helper");

const rutUsuario = "12.345.678-k";
const rutLimpio = getCleanRut(rutUsuario); //12345678K
```

### getValidDV

Devuelve el digito verificador que corresponde al Rut entregado

```js
const { getValidDV } = require("rut-helper");

const rutUsuario = "12345678"; //sin digito verificador
const validDv = getValidDV(rutUsuario); //Output: 2
```

### getRutFormato

Devuelve el RUT entregado con puntos y guion

```js
const { getRutFormato } = require("rut-helper");

const rutUsuario = "123456789";
const rutConFormato = getRutFormato(rutUsuario); //Output: 12.345.678-9
```

### getRutStatus

Devuelve un objeto con todas las caracteristicas de un RUT

```js
const { getRutStatus } = require("rut-helper");

const rutUsuario = "12.345.678-5";

const result = getRutStatus(rutUsuario);
//output:
result:
{
  rut: '12345678',
  dv: '5',
  formato: '12.345.678-5',
  isRutValido: true,
  isDvValido: true,
  isFormatoValido: true
}
```

## Licencia

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)
