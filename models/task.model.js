const db = require('../util/supabase');

module.exports = class Task {
  constructor(title, description, username) {
    this.title = title;
    this.description = description;
    this.username = username;
  }
  
  save() {
    return db.from('tasks').insert({ title: this.title, description: this.description, username: this.username });
  }

  static fetchAll() {
    return db.from('tasks').select('*');
  }

  static fetchByUser(username) {
    return db.from('tasks').select('*').eq('username', username);
  }

  static fetchOne(id) {
    return db.from('tasks').select('*').eq('id_task', id);
  }

  static fetch(id) {
    if (id) {
      return this.fetchOne(id);
    } else {
      return this.fetchAll();
    }
  }

  static update(id, title, description) {
    return db.from('tasks').update({ title: title, description: description }).eq('id_task', id);
  }

  static delete(id) {
    return db.from('tasks').delete().eq('id_task', id);
  }
};
