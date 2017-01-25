import Ember from 'ember';

export default Ember.Route.extend({
  sessionManager: Ember.inject.service(),

  beforeModel() {
    if(!this.get('sessionManager').getUser()) {
      return this.transitionTo('login');
    }
    this.controllerFor('application').set('userLoggedIn', true);
  },

  actions: {
    createGoal(description) {
      this.controller.set('showGoalDialog', false);
      const userMeta = this.get('sessionManager').getUser();
      let user;
      let goal;
      this.store.findRecord('user', userMeta.get('id'))
        .then((userRecord) => {
          user = userRecord;
          goal = this.store.createRecord('goal', {
            user,
            description: description
          });
          return goal.save();
        })
        .then((savedGoal) => {
          Ember.Logger.warn(`Goal ${description} saved`);
          user.get('goals').pushObject(savedGoal);
          return user.save();
        })
        .then(() => {
          Ember.Logger.warn(`Goal ${goal.get('id')} saved for user ${user.get('id')}`);
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
    Ember.Logger.warn(`user id: ${user.get('id')}`);
    return this.store.query('goal', { filter: { userId: user.get('id') } });
  }
});
