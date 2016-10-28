import Ember from 'ember';

export default Ember.Component.extend({
  checked: false,

  actions: {
    toggle() {
      this.sendAction('toggle', this.get('goal'));
      this.toggleProperty('checked');
    }
  }
});
