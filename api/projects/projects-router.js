const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();
const {
	checkProjectId,
	checkProject,
	checkProjectWithCompleted,
} = require("./projects-middleware");

router.get("/", async (req, res, next) => {
	try {
		const projects = await Projects.get();
		res.json(projects);
	} catch (err) {
		res.status(500).json({
			message: "There are no projects to return",
		});
	}
});

router.get("/:id", checkProjectId, async (req, res, next) => {
	await Projects.get(req.params.id)
		.then((project) => res.json(project))
		.catch(next);
});

router.post("/", checkProjectId, checkProject, async (req, res, next) => {
	const newPost = req.body;
	await Projects.insert(newPost)
		.then((post) => {
			res.json(post);
		})
		.catch(next);
});

router.put("/:id", checkProjectId, checkProjectWithCompleted, async (req, res, next) => {
	const {id} = req.params
    try {
		await Projects.update(id, req.body);
		res.status(200).json(req.body);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", checkProjectId, (req, res, next) => {
	Projects.remove(req.params.id)
		.then((project) => res.json())
		.catch(next);
});

router.get("/:id/actions", checkProjectId, (req, res, next) => {
	Projects.getProjectActions(req.params.id)
		.then((project) => res.json(project))
		.catch(next);
});

router.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		stack: err.stack,
	});
});

module.exports = router;