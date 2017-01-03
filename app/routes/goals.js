import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createGoal() {
      this.controller.set('showGoalDialog', false);
      let description = this.controller.get('goalDescription');
      let goal = this.store.createRecord('goal', { description: description });
      goal.save()
        .then(() => {
          this.controller.set('goalDescription', '');
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
  },

  model() {
    return this.store.findAll('goal');
  }
});
