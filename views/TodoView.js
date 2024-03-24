define([
  'jquery',
  'underscore',
  'backbone',
  'text!/templates/TodoTemplate.html',
], function ($, _, Backbone, TodoTemplate) {
  const TodoView = Backbone.View.extend({
    tagName: 'div',
    className: 'todo',
    events: {
      'click .complete-btn': 'onClickComplete',
      'click .trash-btn': 'onClickDelete',
    },

    initialize: function () {
      this.model.view = this;
    },

    onClickComplete: function () {
      this.model.toggle();
      $(`#${this.model.cid}`).toggleClass('completed');
    },

    onClickDelete: function () {
      $(`#${this.model.cid}`).addClass('slide');
      setTimeout(() => {
        this.model.destroy();
      }, 400);
    },

    render: function () {
      const template = _.template(TodoTemplate);
      const html = template(this.model.toJSON());

      this.$el.attr('id', this.model.cid);
      this.$el.html(html);

      return this;
    },
  });

  return TodoView;
});
