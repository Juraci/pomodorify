import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createTask() {
      this.controller.set('showTaskDialog', false);
      const goal = this.modelFor('goals.goal');

      Ember.Logger.warn(`related goal ${goal.get('description')}`);
      Ember.Logger.warn(`related goal ${goal.get('id')}`);

      const taskDescription =  this.controller.get('task');
      let taskRecord = this.get('store').createRecord('task', {
        description: taskDescription,
        goal
      });
      taskRecord.save()
        .then(() => {
          Ember.Logger.warn('Task saved!');
          this.controller.set('task', null);
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
