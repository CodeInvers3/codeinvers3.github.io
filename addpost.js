const fs = require('fs');
const path = require('path');

const newPost = {
  title: 'Mi primer post',
  content: 'Este es el contenido de mi primer post'
};

fs.writeFileSync(path.join(__dirname, '..', 'hello_post.json'), JSON.stringify(newPost), 'utf8');
console.log('Archivo post.json creado exitosamente');