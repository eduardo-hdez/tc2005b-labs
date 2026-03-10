const db = require('../util/supabase');

module.exports = class Task {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
  
  save() {
    return db.from('Tasks').insert({ name: this.name, description: this.description });
  }

  static fetchAll() {
    return db.from('Tasks').select('*');
  }

  static fetchOne(id) {
    return db.from('Tasks').select('*').eq('id', id);
  }

  static fetch(id) {
    if (id) {
      return this.fetchOne(id);
    } else {
      return this.fetchAll();
    }
  }

  static update(id, name, description) {
    return db.from('Tasks').update({ name: name, description: description }).eq('id', id);
  }
};
