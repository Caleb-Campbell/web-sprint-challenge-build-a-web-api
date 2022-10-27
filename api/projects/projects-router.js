// Write your "projects" router here!
const express = require('express')
const router = express.Router()

// model functions imported for use
const Projects = require('./projects-model')

router.get('/', (req, res) => {
    Projects.get()
    .then(data => {
        res.status(200).json(data)
    })
    .catch(error => {
        res.status(500).json([])
    })
})

router.get('/:id', (req, res)=> {
    const {id} = req.params
   Projects.get(id)
   .then(data => {
    if(!data){
        res.status(404).json({
            message: 'project with that id not found'
        })
    }
    else {
        res.status(200).json(data)
    }
   })
   .catch(error => {
    console.log(error)
    res.status(500)
})

})

router.post('/', (req, res) => {
    const {id, name, description, completed} = req.body
    if(!name || !description || !completed){
        res.status(400).json({
            message: 'Cannot have missing fields'
        })
    }
    else {
        Projects.insert(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(500)
        })
        
    }
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const {name, description, completed} = req.body
    if(!Projects.get(id)){
        res.status(204).json({
            message: 'No project with that id could be found'
        })
    }
    else if (!req.body) {
        res.status(400).json({
            message: 'Please include all fields'
        })
    }
    else {
        Projects.update(id, req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(500)
        })

    }
    

})







module.exports = router

// .catch(error => {
//     console.log(error)
//     res.status(500)
// })

// module.exports = {
//     get,
//     insert,
//     update,
//     remove,
//     getProjectActions,
//   };