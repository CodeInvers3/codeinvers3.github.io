const fs = require('fs');
const path = require('path');

exports.handler = async function(event){

    try {

        const subject = event.queryStringParameters.name || 'post'

        const pathPost = path.join(__dirname, 'posts.json')
        const content = fs.readFileSync(pathPost)
    
        return {
            statusCode: 200,
            body: JSON.stringify(JSON.parse(content))
        };

    } catch (error) {
        console.error('Error to get posts:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Cannot get posts: ${error.message}` })
        };
    }
};
