const tasks = [
    {title: "Task 1", description: "Description 1"},
    {title: "Task 2", description: "Description 2"},
];

module.exports = class Tasks {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }
  save() {
    tasks.push(this);
  }
  static fetchAll() {
    return tasks;
  }
};
