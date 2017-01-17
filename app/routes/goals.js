import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createGoal(description) {
      this.controller.set('showGoalDialog', false);
      let goal = this.store.createRecord('goal', { description: description });
      goal.save()
        .then(() => {
          Ember.Logger.warn(`Goal ${description} saved`);
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

    gotoTasks(goal) {
      this.transitionTo('goals.goal.tasks', goal);
    }
  },

  model() {
    return this.store.findAll('goal');
  }
});
