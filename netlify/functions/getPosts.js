const fs = require('fs');
const path = require('path');

exports.handler = async function(){

    try {
        
        const postsDir = path.join(__dirname, '_posts');
        const files = fs.readdirSync('/');
    
        var posts = '';
        files.map(file => {
            posts += postsDir + file + "\n"
        });
    
        return {
            statusCode: 200,
            body: posts
        };

    } catch (error) {
        console.error('Error to get posts:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Cannot get posts: ${error.message}` })
        };
    }
};
