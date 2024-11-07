const fs = require('fs');
const path = require('path');

exports.handler = async function(){

    try {
        
        const postsDir = path.join(__dirname, '_posts');
        const files = fs.readdirSync('/');
    
        const posts = files.map(file => {
            return {
                out: postsDir + file
            };
        });
    
        return {
            statusCode: 200,
            body: JSON.stringify(posts)
        };

    } catch (error) {
        console.error('Error to get posts:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Cannot get posts: ${error.message}` })
        };
    }
};
