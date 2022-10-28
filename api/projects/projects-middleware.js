// add middlewares here related to projects
const Projects = require('./projects-model')

async function checkProjectId (req, res, next) {
    const {id} = req.params
    try {
        const project = await Projects.get(id)
        if(!project){
            res.status(404).json({message: 'does not exist'})
        }
        else {
            next()
        }
    }
    catch (error) {
        next(error)
    }
}

function checkProject (req, res, next){
    const {name, description } = req.body
    if(!name || !description){
        res.status(400).json({message: 'include all fields'})
    }
    else {
        next()
    }
}

module.exports = {
    checkProjectId,
    checkProject
}