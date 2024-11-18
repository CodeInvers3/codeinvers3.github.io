const fs = require('fs');

const newPost = {
  title: 'Mi primer post',
  content: 'Este es el contenido de mi primer post'
};

fs.writeFile('post.json', JSON.stringify(newPost), (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Archivo post.json creado exitosamente');
  }
});