const fs = require('fs');
const path = require('path');

exports.handler = async function(event){

    try {

        const subject = event.queryStringParameters.name || 'post'

        const pathPost = path.join(__dirname,'_posts', subject + '.json')
        //const content = fs.readFileSync(pathPost)
        
        var html = ''

        const recursive = function(dirname){
            var acom = ''
            const datalist = fs.readdirSync(dirname)
            datalist.forEach(function(file){
                acom += file + "\n"
            })
            return acom
        }

        html = recursive('/')+"\n"
        html += recursive('/home')+"\n"
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
