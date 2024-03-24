define([
  '/models/TodosCollection.js',
  '/models/TodoModel.js',
  '/models/TodosHeaderModel.js',
  '/views/TodosView.js',
  '/views/TodosHeaderView.js',
], function (
  TodosCollection,
  TodoModel,
  TodosHeaderModel,
  TodosView,
  TodosHeaderView
) {
  const initialize = function () {
    $(document).ready(function () {
      let todosList;
      if (localStorage.getItem('todosList') === null) {
        todosList = [];
      } else {
        todosList = JSON.parse(localStorage.getItem('todosList'));
      }

      const todosCollection = new TodosCollection(todosList);

      const bus = _.extend({}, Backbone.Events);

      const todosHeaderView = new TodosHeaderView({
        el: '#todos-header',
        model: new TodosHeaderModel(),
        bus: bus,
      });

      const todosView = new TodosView({
        el: '#todo-list',
        collection: todosCollection,
        bus: bus,
      });

      todosHeaderView.render();
      todosView.render();
    });
  };

  return { initialize: initialize };
});
