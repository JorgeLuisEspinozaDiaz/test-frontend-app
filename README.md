# Proyecto Frontend con Angular

Este documento describe los pasos necesarios para instalar y ejecutar el proyecto frontend basado en Angular en un entorno local.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:
- [Node.js](https://nodejs.org/) (versión recomendada: LTS)
- [npm](https://www.npmjs.com/) (gestor de paquetes de Node.js)
- [Angular CLI](https://angular.io/cli) (para manejar proyectos Angular)

Si no tienes Angular CLI instalado, puedes hacerlo con:
```sh
npm install -g @angular/cli
```

## Instalación

Sigue los siguientes pasos para instalar y ejecutar el proyecto:

1. **Clonar el repositorio:**
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. **Instalar dependencias del proyecto:**
   ```sh
   npm install
   ```

3. **Ejecutar la aplicación en modo desarrollo:**
   ```sh
   ng serve
   ```
   Luego, abre en tu navegador `http://localhost:4200/` para ver la aplicación en ejecución.

## Construcción para producción
Si deseas generar una versión optimizada para producción, ejecuta:
   ```sh
   ng build --prod
   ```

## Despliegue
Para desplegar la aplicación en un servidor web, sube el contenido generado en la carpeta `dist/` a tu hosting o servidor.

📌 **La aplicación ya está desplegada en:** [https://pruebafronte.netlify.app/](https://pruebafronte.netlify.app/)

