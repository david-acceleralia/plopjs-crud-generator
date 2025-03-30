# Node.js Express CRUD Generator con PlopJS

Este repositorio proporciona una configuración de ejemplo para generar rápidamente módulos CRUD (Crear, Leer, Actualizar, Borrar) en una aplicación backend Node.js utilizando Express y PlopJS. Facilita la creación consistente de modelos (con Mongoose), controladores y rutas para nuevos recursos de tu API.

## Requisitos Previos

Antes de empezar, asegúrate de tener instalado lo siguiente en tu sistema:

* **Node.js:** (Se recomienda v18.x o superior) - [Descargar Node.js](https://nodejs.org/)
* **npm:** (Viene con Node.js) o **yarn** (Opcional) - [Instalar Yarn](https://yarnpkg.com/)
* **MongoDB:** (Necesario si utilizas el ejemplo de modelo con Mongoose) - [Instalar MongoDB](https://www.mongodb.com/try/download/community)

## Instalación

Sigue estos pasos para configurar el proyecto localmente:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/david-acceleralia/plopjs-crud-generator
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd plopjs-crud-generator
    ```

3.  **Instala las dependencias del proyecto:**
    ```bash
    npm install
    ```
    O si prefieres usar Yarn:
    ```bash
    yarn install
    ```

## Configuración

1.  **Base de Datos:** Asegúrate de que tu instancia de MongoDB esté ejecutándose. Necesitarás configurar la cadena de conexión a tu base de datos dentro de la aplicación (generalmente en `src/app.js` o un archivo de configuración dedicado, posiblemente usando variables de entorno).
2.  **Marcadores de Plop:** Para que PlopJS pueda añadir automáticamente las rutas al archivo principal de rutas, verifica que el archivo `src/routes/index.js` (o el que hayas configurado en `plopfile.js`) contenga los siguientes comentarios marcadores en los lugares apropiados:
    * `// --- Plop Router Imports ---` (donde se añadirán las declaraciones `require`)
    * `// --- Plop Router Use ---` (donde se añadirán las declaraciones `router.use()`)

## Cómo Usar el Generador CRUD

Para generar toda la estructura básica para un nuevo recurso (modelo, controlador y archivo de rutas):

1.  **Ejecuta el comando de Plop:**
    Desde la terminal, en la raíz del proyecto, ejecuta:
    ```bash
    npx plop crud
    ```

2.  **Introduce el nombre del recurso:**
    Se te pedirá que ingreses el nombre del recurso que deseas crear. Escríbelo en **singular y minúsculas** (por ejemplo: `user`, `product`, `task`).

3.  **¡Listo!** PlopJS generará automáticamente los siguientes archivos (usando `product` como ejemplo):
    * `src/models/Product.model.js` (Modelo Mongoose con un esquema básico)
    * `src/controllers/product.controller.js` (Controlador con funciones para crear, leer, actualizar y eliminar)
    * `src/routes/product.routes.js` (Archivo de rutas Express que mapea endpoints a las funciones del controlador)

4.  **Actualización Automática de Rutas:** Si los marcadores están correctamente configurados en `src/routes/index.js`, PlopJS también modificará este archivo para importar y registrar las nuevas rutas. Por ejemplo, añadirá algo como:
    ```javascript
    // Importación añadida:
    const productRoutes = require('./product.routes');
    // Uso añadido:
    router.use('/products', productRoutes); // Nótese la pluralización automática
    ```

## Ejecutar la Aplicación

Para iniciar el servidor de desarrollo (asumiendo que tienes un script `dev` o `start` en tu `package.json`):

```bash
# Usando nodemon para desarrollo (recomendado)
npm run dev

# O para iniciar en modo producción
npm start