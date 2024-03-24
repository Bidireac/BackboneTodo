define(['backbone'], function (Backbone) {
  const TodoModel = Backbone.Model.extend({
    defaults: {
      completed: false,
    },

    validate: function (attrs) {
      if (!attrs.todoItem || attrs.todoItem.length <= 0) {
        return 'A todo item must be provided!';
      }
    },

    toggle: function () {
      this.set('completed', !this.get('completed'));
    },
  });

  return TodoModel;
});
