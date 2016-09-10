import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    createGoal() {
      let description = this.controller.get('goal');
      let goal = this.store.createRecord('goal', { description: description });
      goal.save()
        .then(() => {
          this.controller.set('goal', '');
          this.transitionTo('goals');
        })
        .catch((err) => {
          Ember.Logger.error(`Error while trying to save goal:\n${err}`);
        });
    }
  }
});
