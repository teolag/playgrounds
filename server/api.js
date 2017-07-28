const http = require('http');
const express = require('express');
const router = express.Router();
const config = require('../config');
const PlaygroundHandler = require("./handlers/playground-handler");
const bodyParser = require('body-parser');

router.get("/playgrounds", (req, res) => {
	PlaygroundHandler.getAll().then(playgrounds => {
		res.json(playgrounds);
	});
});

router.get("/playgrounds/:id", (req, res) => {
	const id = req.params.id;
	PlaygroundHandler.get(id).then(p => {
		res.json(p);
	});
});

router.delete("/playgrounds/:id", (req, res) => {
	const id = req.params.id;
	PlaygroundHandler.remove(id).then(rowsRemoved => {
		console.log("Rows deleted", rowsRemoved);
		res.json({massage: "Playground deleted", playgroundId: id});
	});
});

router.post('/playgrounds', bodyParser.json(), (req, res) => {
	console.log("Create new playground", req.body);
	const playground = req.body;

	PlaygroundHandler.createNew(playground)
        .then(playgroundId => {
            playground._id = playgroundId;
            res.json({message:'Playground created', playground});
        });
});

router.post('/playgrounds/:id', bodyParser.json(), (req, res) => {
	const id = req.params.id;
	const playground = req.body;

	PlaygroundHandler.update(id, playground)
        .then(rowsUpdated => {
            console.log("rowsUpdated", rowsUpdated);
            playground._id = id;
            res.json({message:'Playground updated', playground});
        });
});

module.exports = router;