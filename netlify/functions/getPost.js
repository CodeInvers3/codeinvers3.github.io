const fs = require('fs');
const path = require('path');

exports.handler = async function(event){

    try {

        const subject = event.queryStringParameters.name || 'post'

        const pathPost = path.join(__dirname,'_posts', subject + '.json')
        const content = fs.readFileSync(pathPost)
        const dirlist = fs.readdirSync('/')
        var html = ''

        dirlist.forEach(function(file){
            html += file + "\n"
        })
    
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
