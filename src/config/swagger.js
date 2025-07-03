const { config } = require('dotenv')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const path = require('path')
config()

//docs location
const authDocs=YAML.load(path.join(__dirname,'../docs/api-docs/auth.yaml'))


const specs = {
    openapi: '3.0.0',
    info: {
        title: "Electronics BAckend API",
        description: "This swagger documentation has all the details about the api's of electronic project",
        version:'1.0.0'
    },
    servers:[{url:`http://localhost:${process.env.PORT||3333}/api`}],
    paths:{
...authDocs.paths
    },
    components:{
        securitySchemes:{
            bearerAuth:{
                type:'http',
                scheme:'bearer',
                bearerFormat:'JWT'
            }
        }
    },
    security:[{bearerAuth:[]}]
}


module.exports={
    swaggerUi,specs
}