import Ember from 'ember';

export default Ember.Route.extend({
  sessionManager: Ember.inject.service(),

  beforeModel() {
    if(!this.get('sessionManager').getUser()) {
      this.transitionTo('index');
    }
  },

  actions: {
    createGoal(description) {
      this.controller.set('showGoalDialog', false);
      const user = this.get('sessionManager').getUser();
      const goalRecord = this.store.createRecord('goal', {
        user,
        description: description
      });
      goalRecord.save()
        .then(() => {
          Ember.Logger.warn(`Goal ${description} saved`);
          user.get('goals').pushObject(goalRecord);
          return user.save();
        })
        .then(() => {
          Ember.Logger.warn(`Goal ${goalRecord.get('id')} saved for user ${user.get('id')}`);
          this.refresh();
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
    const user = this.get('sessionManager').getUser();
    return this.store.query('goal', { filter: { userId: user.get('id') } });
  }
});
