const db = require('../util/database');

module.exports = class Tasks {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
  save() {
    tasks.push(this);
  }
  static fetchAll() {
    return db.execute('SELECT * FROM tasks');
  }
};
