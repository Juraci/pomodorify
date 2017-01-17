import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createTask(description) {
      this.controller.set('showTaskDialog', false);
      const goal = this.modelFor('goals.goal');

      Ember.Logger.warn(`related goal ${goal.get('description')}`);
      Ember.Logger.warn(`related goal ${goal.get('id')}`);

      let taskRecord = this.get('store').createRecord('task', {
        description,
        goal
      });
      taskRecord.save()
        .then(() => {
          Ember.Logger.warn('Task saved!');
          goal.get('tasks').pushObject(taskRecord);
          return goal.save();
        })
        .then(() => {
          Ember.Logger.warn(`Goal id: ${goal.get('id')} updated!`);
        })
        .catch(err => {
          Ember.Logger.error(`Error while trying to save the task:\n${err}`);
        });
    },

    openTaskDialog() {
      this.controller.set('showTaskDialog', true);
    },

    closeTaskDialog() {
      this.controller.set('showTaskDialog', false);
    }
  },

  model() {
    return this.modelFor('goals.goal').get('tasks');
  }
});
