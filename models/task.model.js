const db = require('../util/supabase');

module.exports = class Task {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
  
  save() {
    return db.from('Tasks').insert({ title: this.title, description: this.description });
  }

  static fetchAll() {
    return db.from('Tasks').select('*');
  }

  static fetchOne(id) {
    return db.from('Tasks').select('*').eq('id', id_task);
  }

  static fetch(id) {
    if (id) {
      return this.fetchOne(id);
    } else {
      return this.fetchAll();
    }
  }

  static update(id_task, title, description) {
    return db.from('Tasks').update({ title: title, description: description }).eq('id', id_task);
  }
};
