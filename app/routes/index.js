import Ember from 'ember';

export default Ember.Route.extend({
  sessionManager: Ember.inject.service(),

  actions: {
    login() {
      const email = this.controller.get('email');
      this.controller.set('spinner', true);
      this.store.query('user', { filter: { email: email }})
        .then((records) => {
          if(records.get('length') !== 1) {
            throw new Error('more than a user with the same email');
          }
          records.forEach((u) => {
            Ember.Logger.warn(`${u.get('email')}`);
          });
          this.get('sessionManager').setUser(records.get('firstObject'));
          this.transitionTo('goals');
        })
        .catch((err) =>  {
          this.controller.set('spinner', false);
          Ember.Logger.error(err);
        });
    }
  }
});
