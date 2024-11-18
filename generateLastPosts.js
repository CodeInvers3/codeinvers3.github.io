const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '_posts');
const lastPostsFile = path.join(__dirname, 'lastposts.json');

// Lee archivos de la carpeta _posts y ordena por fecha
const posts = fs.readdirSync(postsDir)
  .filter(file => file.endsWith('.json'))
  .map(file => {
    const filePath = path.join(postsDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return { ...content, filename: file };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date)) // Ordena por fecha, el más reciente primero
  .slice(0, 10); // Limita a los 10 posts más recientes

// Escribe el archivo lastposts.json
fs.writeFileSync(lastPostsFile, JSON.stringify(posts, null, 2), 'utf8');
console.log('lastposts.json generado exitosamente.');
