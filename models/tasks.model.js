const db = require('../util/database');

module.exports = class Tasks {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
  save() {
    return db.execute('INSERT INTO tasks (name, description) VALUES (?, ?)', [this.name, this.description]);
  }
  static fetchAll() {
    return db.execute('SELECT * FROM tasks');
  }
};
