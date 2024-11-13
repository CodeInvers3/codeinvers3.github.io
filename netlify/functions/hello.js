const fs = require('fs');
const path = require('path');

exports.handler = async event => {
    const subject = event.queryStringParameters.name || 'World'

    var html = ''
    
    html = recursive('/var/task')

    return {
        statusCode: 200,
        body: html,
    }
}