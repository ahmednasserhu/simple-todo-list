const fs = require("fs");
const { todo } = require("node:test");
const path = require("path");
const [, , command, entry, editedEntry] = process.argv;
const content = fs.readFileSync(path.join(__dirname, "todos.json"), "utf-8");
const todos = JSON.parse(content);

function todoList(command, ...args) {
  const operation = {
    add: addEntry,
    list: listEntries,
    edit: editEntry,
    delete: deleteEntry,
    default: () => console.log("You have entered a wrong command"),
  };

  const op = operation[command.toLowerCase()] || operation["default"];
  return op(...args);
}

todoList(command, entry, editedEntry);

function addEntry(title) {
  const entryID = findHighestID() + 1;
  let todo = { id: entryID, title, status: "to-do" };
  fs.writeFileSync(
    path.join(__dirname, "todos.json"),
    JSON.stringify(todos.concat(todo))
  );
}

function addEntry(title) {
  const entryID = findHighestID() + 1;
  let todo = { id: entryID, title, status: "to-do" };
  fs.writeFileSync(
    path.join(__dirname, "todos.json"),
    JSON.stringify(todos.concat(todo))
  );
}

function listEntries() {
  todos.forEach((todo) => {
    console.log(`ID: ${todo.id} Title: ${todo.title} Status: ${todo.status}`);
  });
}

function editEntry(id, title) {
  const existingTodo = todos.find((element) => element.id === Number(id));
  if (!existingTodo) {
    console.log("The provided id does not exist");
  } else {
    existingTodo.title = title;
    fs.writeFileSync(path.join(__dirname, "todos.json"), JSON.stringify(todos));
  }
}

function deleteEntry(id) {
  const deletedTodo = todos.find((element) => element.id === Number(id));
  if (!deletedTodo) {
    console.log("The provided id does not exist");
  } else {
    const index = todos.findIndex((element) => element.id === Number(id));
    todos.splice(index, 1);
    fs.writeFileSync(path.join(__dirname, "todos.json"), JSON.stringify(todos));
  }
}

function findHighestID() {
  if(todos.length === 0){
    return 0;
  }else{
    const lastElement = todos[todos.length-1];
    return lastElement.id;
  }
}


