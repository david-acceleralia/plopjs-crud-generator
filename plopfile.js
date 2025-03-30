// plopfile.js
module.exports = function (plop) {
    // Helper para pluralizar (simplificado - para inglés básico)
    // Para una solución más robusta, considera instalar 'pluralize'
    // npm install --save-dev pluralize
    // const pluralize = require('pluralize');
    // plop.setHelper('plural', (text) => pluralize(text));
    plop.setHelper('plural', (text) => text + 's'); // Ejemplo simple
  
    // Generador CRUD
    plop.setGenerator('crud', {
      description: 'Genera un recurso CRUD completo (Modelo, Controlador, Rutas)',
      prompts: [
        {
          type: 'input',
          name: 'name', // Nombre del recurso en singular, ej: user, product
          message: 'Nombre del recurso (en singular, minúsculas)?',
          validate: function (value) {
            if ((/.+/).test(value)) { return true; }
            return 'El nombre es obligatorio';
          }
        },
      ],
      actions: function(data) {
        const basePath = 'src'; // Ruta base donde se generarán los archivos
        const actions = [
          // --- Crear Modelo ---
          {
            type: 'add',
            path: `${basePath}/models/{{pascalCase name}}.model.js`,
            templateFile: 'plop-templates/crud/model.js.hbs',
            abortOnFail: true,
          },
          // --- Crear Controlador ---
          {
            type: 'add',
            path: `${basePath}/controllers/{{camelCase name}}.controller.js`,
            templateFile: 'plop-templates/crud/controller.js.hbs',
            abortOnFail: true,
          },
          // --- Crear Rutas ---
          {
            type: 'add',
            path: `${basePath}/routes/{{camelCase name}}.routes.js`,
            templateFile: 'plop-templates/crud/routes.js.hbs',
            abortOnFail: true,
          },
          // --- Modificar archivo principal de rutas (opcional pero útil) ---
          // Añade la importación de las nuevas rutas
          {
              type: 'modify',
              path: `${basePath}/routes/index.js`, // Asegúrate que este archivo exista
              pattern: /(\/\/ --- Plop Router Imports ---)/g, // Busca este comentario
              template: '$1\nconst {{camelCase name}}Routes = require(\'./{{camelCase name}}.routes\');',
              abortOnFail: false, // No fallar si el patrón no se encuentra
          },
          // Añade el uso de las nuevas rutas
          {
              type: 'modify',
              path: `${basePath}/routes/index.js`,
              pattern: /(\/\/ --- Plop Router Use ---)/g, // Busca este comentario
              template: '$1\nrouter.use(\'/{{plural (camelCase name)}}\', {{camelCase name}}Routes);',
               abortOnFail: false,
          },
           // --- Modificar app.js (si registras rutas directamente allí) ---
           // Ejemplo si registras rutas en app.js en lugar de routes/index.js
          // {
          //     type: 'modify',
          //     path: `${basePath}/app.js`,
          //     pattern: /(\/\/ --- Plop App Routes ---)/g, // Busca este comentario en app.js
          //     template: '$1\nconst {{camelCase name}}Routes = require(\'./routes/{{camelCase name}}.routes\');\napp.use(\'/api/{{plural (camelCase name)}}\', {{camelCase name}}Routes);',
          //      abortOnFail: false,
          // },
        ];
        return actions;
      }
    });
  };