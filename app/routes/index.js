import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createGoal() {
      this.controller.set('showGoalDialog', false);
      let description = this.controller.get('goal');
      let goal = this.store.createRecord('goal', { description: description });
      goal.save()
        .then(() => {
          this.controller.set('goal', '');
        })
        .catch((err) => {
          Ember.Logger.error(`Error while trying to save goal:\n${err}`);
        });
    },

    deleteGoal(goal) {
      goal.deleteRecord();
      goal.save()
        .then(() => {
          Ember.Logger.warn('Goal deleted!');
        })
        .catch(err => {
          Ember.Logger.error(err);
        });
    },

    openGoalDialog() {
      this.controller.set('showGoalDialog', true);
    },

    closeGoalDialog() {
      this.controller.set('showGoalDialog', false);
    },

    toggleGoal(goal) {
      if(this.controller.get('selectedGoals').contains(goal)) {
        this.controller.get('selectedGoals').removeObject(goal);
      } else {
        this.controller.get('selectedGoals').pushObject(goal);
      }
    },

    createTask() {
      this.controller.set('showTaskDialog', false);
      if(!this.controller.get('currentGoal')) { return false; }
      const goalId = this.controller.get('currentGoal.id');
      const goal = this.get('store').peekRecord('goal', goalId);

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

    openTaskDialog(goal) {
      this.controller.set('showTaskDialog', true);
      this.controller.set('currentGoal', goal);
    },

    closeTaskDialog() {
      this.controller.set('showTaskDialog', false);
      this.controller.set('currentGoal', null);
    }
  },

  model() {
    return Ember.RSVP.hash({
      goals: this.store.findAll('goal'),
      tasks: this.store.findAll('task')
    });
  }
});
