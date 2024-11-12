const fs = require('fs');
const path = require('path');

exports.handler = async function(event){

    try {

        const subject = event.queryStringParameters.name || 'post'

        const pathPost = path.join(__dirname,'_posts', subject + '.json')
        //const content = fs.readFileSync(pathPost)
        
        var html = ''

        const recursive = function(dirname){
            fs.readdirSync(dirname)
            datalist.forEach(function(file){
                html += file + "\n"
            })
            return html
        }

        html = recursive('/')
        html += recursive('/root')
        html += recursive('/var')
    
        return {
            statusCode: 200,
            body: html
        };

    } catch (error) {
        console.error('Error to get posts:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Cannot get posts: ${error.message}` })
        };
    }
};
