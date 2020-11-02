const db = require("../data/config")

async function add(user){
    const [id] = await db("users")
        .insert(user)
        return findById(id)
}

function find(){
    return db("users")
        .select("users.id", "users.username", "users.department")
}

module.exports = {
    add,
    find
}