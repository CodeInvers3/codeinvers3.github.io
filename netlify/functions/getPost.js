const fs = require('fs');
const path = require('path');

exports.handler = async function(event){

    try {

        const subject = event.queryStringParameters.name || 'post'
        const postPath = path.join('netlify', 'functions', '_posts', subject + '.json')
        const postContent = fs.readFileSync(postPath, 'utf8');

        const dirlist = fs.readdirSync('/');
        const data = []

        dirlist.forEach(function(file){
            data.push(file + "\n");
        })
    
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };

    } catch (error) {
        console.error('Error to get posts:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Cannot get posts: ${error.message}` })
        };
    }
};
