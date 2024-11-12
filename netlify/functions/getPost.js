const fs = require('fs');
const path = require('path');

exports.handler = async function(event){

    try {

        const subject = event.queryStringParameters.name || 'post'
        const postsDir = path.join(__dirname, '_posts', subject + '.json');
        const post = fs.readFileSync(postsDir);
    
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
