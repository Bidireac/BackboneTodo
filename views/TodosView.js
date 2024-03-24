define([
  'jquery',
  'underscore',
  'backbone',
  '/models/TodoModel.js',
  '/views/TodoView.js',
], function ($, _, Backbone, TodoModel, TodoView) {
  const TodosView = Backbone.View.extend({
    tagName: 'ul',
    className: 'todo-list',

    initialize: function (options) {
      this.bus = options.bus;
      this.bus.on('todoAdded', this.createNewTodoItem, this);
      this.bus.on('filteredTodo', this.filteredTodoItems, this);
      this.collection.on('add', this.addNewTodoItem, this);
      this.collection.on('remove', this.removeTodoItem, this);
    },

    createNewTodoItem: function (todoItemValue) {
      const todoModel = new TodoModel({
        todoItem: todoItemValue,
      });
      if (todoModel.isValid()) {
        this.collection.add(todoModel);
        this.collection.saveLocalTodos(todoModel);
      } else {
        alert(todoModel.validationError);
      }
    },

    addNewTodoItem: function (todoModel) {
      const todoView = new TodoView({ model: todoModel });
      this.$el.append(todoView.render().$el);
    },

    removeTodoItem: function (todoItem) {
      const todoId = todoItem.cid;
      this.collection.removeLocalTodos(todoItem);
      $(`#${todoId}`).remove();
    },

    filteredTodoItems: function (filterBy) {
      this.collection.each((todo) => {
        const todoStatus = todo.get('completed');
        switch (filterBy) {
          case 'all':
            todo.view.$el.show();
            break;
          case 'completed':
            todoStatus ? todo.view.$el.show() : todo.view.$el.hide();
            break;
          case 'incomplete':
            !todoStatus ? todo.view.$el.show() : todo.view.$el.hide();
            break;
        }
      });
    },

    render: function () {
      this.collection.each((todo) => {
        const viewToRender = new TodoView({ model: todo });

        this.$el.append(viewToRender.render().$el);
      });

      return this;
    },
  });

  return TodosView;
});
