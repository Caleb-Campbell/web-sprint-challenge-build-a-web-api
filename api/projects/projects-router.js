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

    
    if(!name || !description || !completed){
        res.status(400).json({message: "Please provide all data"})
    }
    else {
        Projects.update(id, req.body)
        .then(project => {
            Projects.get(project.id)
        })
        .then(update => {
            res.status(201).json(update)
            Projects.get(id)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({message: 'server error'})
        })
    }


    

})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try{
        const projectToDelete = await Projects.get(id)
        if(!projectToDelete){
            res.status(404).json({message: 'post not found'})
        }
        else {
            await this.Projects.remove(id)
            res.status(200).res.json(projectToDelete)
        }
    }
    catch (error){
        console.log(error)
        res.status(500).json({message: "server error"})
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