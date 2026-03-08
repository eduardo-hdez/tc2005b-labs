const db = require('../util/database');

module.exports = class Tasks {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
  save() {
    return db.execute('INSERT INTO tasks (title, description) VALUES (?, ?)', [this.title, this.description]);
  }
  static fetchAll() {
    return db.execute('SELECT * FROM tasks');
  }
};
