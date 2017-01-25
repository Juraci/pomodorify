import Ember from 'ember';

export default Ember.Route.extend({
  sessionManager: Ember.inject.service(),

  actions: {
    didTransition() {
      this.controller.set('inputErrors', []);
      this.controller.set('spinner', false);
      if(this.get('sessionManager').getUser()) {
        this.transitionTo('goals');
        this.controllerFor('application').set('userLoggedIn', true);
      }
    },

    onChange(value) {
      this.controller.set('email', value);
      this.controller.set('inputErrors', []);
    },

    login() {
      const email = this.controller.get('email');
      this.controller.set('spinner', true);

      this.store.query('user', { filter: { email: email }})
        .then((records) => {
          if(records.get('length') !== 1) {
            this.controller.set('inputErrors', ['You shall not pass']);
            this.controller.set('spinner', false);
            return;
          }
          this.controllerFor('application').set('userLoggedIn', true);
          this.get('sessionManager').setUser(records.get('firstObject'));
          this.controller.set('inputErrors', []);
          this.transitionTo('goals');
        })
        .catch((err) =>  {
          this.controller.set('spinner', false);
          this.controller.set('inputErrors', ['server error, sorry, drop me an email juraci.vieira@gmail.com']);
          Ember.Logger.error(err);
        });
    }
  }
});
