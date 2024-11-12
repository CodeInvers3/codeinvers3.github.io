const fs = require('fs');
const path = require('path');

exports.handler = async function(event){

    try {

        const subject = event.queryStringParameters.name || 'post'

        const dirlist = fs.readdirSync('/');
        var data = ''

        dirlist.forEach(function(file){
            data += file + "\n";
        })
    
        return {
            statusCode: 200,
            body: data
        };

    } catch (error) {
        console.error('Error to get posts:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Cannot get posts: ${error.message}` })
        };
    }
};
