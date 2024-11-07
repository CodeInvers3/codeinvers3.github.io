const fs = require('fs');
const path = require('path');

exports.handler = async function(){

    try {
        
        const postsDir = path.join(__dirname, '_posts');
        const files = fs.readdirSync('_posts');
    
        /*const posts = files.filter(file => file.endsWith('.json')).map(file => {
            const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
            return JSON.parse(content);
        });*/
    
        return {
            statusCode: 200,
            body: postsDir
        };

    } catch (error) {
        console.error('Error to get posts:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Cannot get posts: ${error.message}` })
        };
    }
};
