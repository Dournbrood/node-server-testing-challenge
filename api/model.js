const database = require("../data/dbConfig");

module.exports = {
    add,
    findBy,
    findById,
    remove,
}

async function add(monster) {
    const [id] = await database("monsters").insert(monster)

    return findById(id);
}

function findById(id) {
    return database("monsters")
        .where({ id })
        .first()
}

function findBy(filter) {
    return database("monsters")
        .where(filter)
}

function remove(filter) {
    return database("monsters")
        .where(filter)
        .delete()
}