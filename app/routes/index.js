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
          this.transitionTo('index');
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
          this.transitionTo('index');
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
    }
  },

  model() {
    return this.store.findAll('goal');
  }
});
