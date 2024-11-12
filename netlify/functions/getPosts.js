const fs = require('fs');
const path = require('path');

exports.handler = async function(){

    try {

        const postsDir = path.join(__dirname, '_posts', 'post.json');
        const post = fs.readFileSync(postsDir);

        console.log(post)
    
        return {
            statusCode: 200,
            body: JSON.stringify(JSON.parse(post))
        };

    } catch (error) {
        console.error('Error to get posts:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Cannot get posts: ${error.message}` })
        };
    }
};
