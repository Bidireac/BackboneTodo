define(['backbone', '/models/TodoModel.js'], function (Backbone, TodoModel) {
  const TodosCollection = Backbone.Collection.extend({
    model: TodoModel,

    completeTodo: function (completedTodo) {},

    saveLocalTodos: function (todoModel) {
      let todosList = JSON.parse(localStorage.getItem('todosList')) || [];
      todosList.push(todoModel);
      localStorage.setItem('todosList', JSON.stringify(todosList));
    },

    removeLocalTodos: function (todoItem) {
      let todosList = JSON.parse(localStorage.getItem('todosList'));
      const filteredList = todosList.filter(
        (todoObject) => JSON.stringify(todoObject) !== JSON.stringify(todoItem)
      );
      localStorage.setItem('todosList', JSON.stringify(filteredList));
    },
  });

  return TodosCollection;
});
