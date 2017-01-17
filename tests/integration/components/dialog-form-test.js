import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dialog-form', 'Integration | Component | dialog form', {
  integration: true
});

skip('it renders when showdialog is set to true', function(assert) {
  this.set('closeDialog', () => {});
  this.set('onSubmitAction', () => {});
  this.set('showCustomDialog', true);
  this.render(hbs`{{dialog-form label='goal' inputId='goal' showDialog=showCustomDialog closeDialog=closeDialog onSubmit=onSubmitAction}}`);

  assert.equal(this.$('#goal').length, 1);
});

skip('it does not render when showdialog is set to false', function(assert) {
  this.set('closeDialog', () => {});
  this.set('onSubmitAction', () => {});
  this.set('showCustomDialog', false);
  this.render(hbs`{{dialog-form
      label='Goal'
      inputId='goal'
      showDialog=showCustomDialog
      closeDialog=closeDialog
      onSubmit=onSubmitAction}}`
  );

  assert.equal(this.$('#goal'), []);
});
