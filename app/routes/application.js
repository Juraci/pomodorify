import Ember from 'ember';

export default Ember.Route.extend({
  sessionManager: Ember.inject.service(),

  actions: {
    logout() {
      this.get('sessionManager').forgetUser();
      this.controller.set('userLoggedIn', false);
      this.transitionTo('login');
    }
  }
});
