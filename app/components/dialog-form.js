import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    submit(description) {
      this.get('onSubmit')(description);
      this.set('description', null);
    },

    close() {
      this.get('closeDialog')();
      this.set('description', null);
    }
  }
});
