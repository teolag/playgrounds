const Datastore = require('nedb-promise');
const playgroundDB = new Datastore({
    filename: 'server/nedb/playgrounds',
    autoload: true
});

function createNew(playground) {
    playground.added = new Date();
    return playgroundDB.insert(playground).then(data => data._id);
}

function getAll() {
    return playgroundDB.find({});
}

function get(playgroundId) {
    return playgroundDB.findOne({ _id: playgroundId });
}

function update(playgroundId, playground) {
    return playgroundDB.update({ _id: playgroundId }, playground);
}

function remove(playgroundId) {
	return playgroundDB.remove({ _id: playgroundId });
}

module.exports = {
    createNew, getAll, get, update, remove
};