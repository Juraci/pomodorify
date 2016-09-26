import { test } from 'qunit';
import moduleForAcceptance from 'pomodorify/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | create goal');

test('creating a goal', (assert) => {
  visit('/goals');

  fillIn('#input-goal', 'Feel comfortable with Node.js backend development');
  click('#create');

  andThen(() => {
    assert.equal(find('.goal').length, 1);
  });
});
