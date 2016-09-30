import { test } from 'qunit';
import moduleForAcceptance from 'pomodorify/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | create goal');

test('creating a goal', (assert) => {
  const description = 'Feel comfortable with Node.js backend development';

  visit('/goals');

  fillIn('#input-goal', description);
  click('#create');

  andThen(() => {
    assert.equal(find('.goal').length, 1);
    assert.equal(find('.goal:eq(0) p').text(), description);
  });
});
