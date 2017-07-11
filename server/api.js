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
	console.log("BODY", req.body);
	res.json({message:"hej hej gamla"});
});



module.exports = router;


