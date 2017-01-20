import { moduleForComponent, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('dialog-form', 'Integration | Component | dialog form', {
  integration: true
});

skip('it renders when showDialog is set to true', function(assert) {
  assert.expect(1);

  this.set('closeDialog', () => {});
  this.set('onSubmitAction', () => {});
  this.set('show', true);
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{dialog-form
      label='goal'
      inputId='goal'
      showDialog=show
      closeDialog=closeDialog
      onSubmit=onSubmitAction
    }}
  `);

  return wait().then(() => {
    assert.ok(this.$('.dialog-form').length);
  });
});

skip('it does not render when showDialog is set to false', function(assert) {
  this.set('closeDialog', () => {});
  this.set('onSubmitAction', () => {});
  this.set('show', false);
  this.render(hbs`
    <div id="paper-wormhole"></div>
    {{dialog-form
      label='Goal'
      inputId='goal'
      showDialog=show
      closeDialog=closeDialog
      onSubmit=onSubmitAction
    }}`
  );

  assert.equal(this.$('.dialog-form').length, 0);
});
