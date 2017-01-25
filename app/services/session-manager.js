import Ember from 'ember';

export default Ember.Service.extend({
  user: null,

  init() {
    this._super(...arguments);
    const email = window.localStorage.getItem('email');
    const id = window.localStorage.getItem('id');
    if (id && email) {
      this.set('user', Ember.Object.create({ id, email }));
    } else {
      window.localStorage.clear();
    }
  },

  setUser(user) {
    let userObj = Ember.Object.create({ email: user.get('email'), id: user.get('id') });
    this.set('user', userObj);
    window.localStorage.setItem('email', userObj.get('email'));
    window.localStorage.setItem('id', userObj.get('id'));
  },

  getUser() {
    return this.get('user');
  }
});
