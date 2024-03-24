define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/TodosHeaderTemplate.html',
], function ($, _, Backbone, TodosHeaderTemplate) {
  const TodosHeaderView = Backbone.View.extend({
    el: 'button',
    events: {
      'click #add-todo-btn': 'onClickAdded',
      'keypress #add-todo-input': 'onKeyPress',
      'change .filter-todo': 'onFilterSelect',
    },

    initialize: function (options) {
      this.bus = options.bus;
    },

    onClickAdded: function () {
      const inputValue = $('#add-todo-input').val();
      this.bus.trigger('todoAdded', inputValue);
      $('#add-todo-input').val('');
    },

    onKeyPress: function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.onClickAdded();
      }
    },

    onFilterSelect: function (e) {
      const filterBy = e.target.value;
      this.bus.trigger('filteredTodo', filterBy);
    },

    render: function () {
      this.$el.html(TodosHeaderTemplate);

      return this;
    },
  });

  return TodosHeaderView;
});
