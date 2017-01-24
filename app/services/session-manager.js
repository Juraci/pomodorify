import Ember from 'ember';

export default Ember.Service.extend({
  user: null,

  init() {
    this._super(...arguments);
  },

  setUser(user) {
    Ember.Logger.warn(user.get('email'));
    this.set('user', user);
  },

  getUser() {
    return this.get('user');
  }
});
