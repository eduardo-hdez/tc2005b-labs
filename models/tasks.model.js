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

  static fetchOne(id) {
    return db.execute('SELECT * FROM tasks WHERE id = ?', [id]);
  }

  static fetch(id) {
    if (id) {
      return this.fetchOne(id);
    } else {
      return this.fetchAll();
    }
  }

  static update(id, name, description) {
    return db.execute('UPDATE tasks SET name = ?, description = ? WHERE id = ?', [name, description, id]);
  }
};
