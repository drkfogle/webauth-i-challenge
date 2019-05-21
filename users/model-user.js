module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter){
    return db('users').where(filter);
}



async function add() {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findById() {
  return db("users")
    .where({ id })
    .first();
}
