import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('goal-report', 'Integration | Component | goal report', {
  integration: true
});

test('it displays the total number of pomodoros for the goal', function(assert) {
  const goal = Ember.Object.create({
    description: 'Git gud in Dark Souls',
    pomodoros: 5
  });

  this.set('goal', goal);

  this.render(hbs`{{goal-report goal=goal}}`);
  assert.equal($('#goal-report .total-pomodoros').text(), '5');
});
