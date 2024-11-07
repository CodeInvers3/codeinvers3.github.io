const fs = require('fs');
const path = require('path');

exports.handler = async function(){

    try {
        
        const postsDir = path.join(process.cwd(), '_posts');
        const files = fs.readdirSync(postsDir);
    
        const posts = files.filter(file => file.endsWith('.json')).map(file => {
            const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
            return JSON.parse(content);
        });
    
        return {
            statusCode: 200,
            body: process.cwd() + '_posts'
        };

    } catch (error) {
        console.error('Error to get posts:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Cannot get posts: ${error.message}` })
        };
    }
};
