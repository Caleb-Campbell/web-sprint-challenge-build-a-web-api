// Write your "actions" router here!
const express = require('express')
const router = express.Router()

// model functions imported for use
const Action = require('./actions-model')
const {checkAction, checkActionId} = require('./projects-middleware')

router.get('/', (req, res) => {
    Action.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(error => {
        console.log(error)
        res.status(500)
    })
})

router.get('/:id', checkActionId, (req, res) => {
    
})

router.post('/', (req, res) => {
if(!req.body.notes || !req.body.description || !req.body.project_id){
    res.status(400)
}
else {
    Action.insert(req.body)
    .then(result => {
    res.status(200).json(result)
})
.catch(error => {
    console.log(error)
    res.status(500)
})
}
})









module.exports = router