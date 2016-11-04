import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    delete() {
      this.sendAction('delete', this.get('goal'));
    },

    openDialog() {
      this.sendAction('openDialog', this.get('goal'));
    }
  }
});
