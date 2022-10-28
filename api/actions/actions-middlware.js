// add middlewares here related to actio

const Action = require('./actions-model')

async function checkActionId (req, res, next) {
    const {id} = req.params
    try {
        const action = await Action.get(id)
        if(!action){
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

function checkAction (req, res, next){
    const {notes, description, project_id} = req.body
    if(!notes || !description || !project_id){
        res.status(400).json({message: 'include all fields'})
    }
    else {
        next()
    }
}

module.exports = {
    checkActionId,
    checkAction
}