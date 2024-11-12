exports.handler = async event => {
    const subject = event.queryStringParameters.name || 'World'

    var html = ''

        const recursive = function(dirname){
            var acom = ''
            const datalist = fs.readdirSync(dirname)
            datalist.forEach(function(file){
                acom += file + "\n"
            })
            return acom
        }
        html = recursive('/var/task')

    return {
        statusCode: 200,
        body: html,
    }
}