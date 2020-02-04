const db = require("../data/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  getParentChildren
};

function find() {
  return db("parent");
}

async function add(parent) {
  const [id] = await db("parent").insert(parent);

  return findById(id);
}

function findBy(filter) {
  return db("parent").where(filter);
}

function findById(id) {
  return db("parent")
    .where({ id })
    .first();
}

// select child.id, child.name, child.role, child.parent_id, child.current_streaks, child.total_points, child.highest_points
// from child
// join parent on parent.id = child.parent_id
// where child.parent_id = 1

function getParentChildren(id) {
  return db("child")
    .select(
      "child.id",
      "child.name",
      "child.role",
      "child.parent_id",
      "child.current_streaks",
      "child.total_points",
      "child.highest_points"
    )
    .join("parent", "parent.id", "child.parent_id")
    .where("child.parent_id", id);
}
