import { test } from 'qunit';
import moduleForAcceptance from 'pomodorify/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | create goal');

test('creating a goal', (assert) => {
  const description = 'Feel comfortable with Node.js backend development';

  visit('/');

  click('#add-goal');
  fillIn('#input-goal', description);
  click('#create');

  andThen(() => {
    assert.equal(find('.goal').length, 1);
    assert.equal(find('.goal:eq(0) p').text(), description);
  });
});

test('deleting a goal', (assert) => {
  server.create('goal', { description: 'Feel comfortable with Node.js development' });

  visit('/');
  click('.goal:eq(0) .delete');

  andThen(() => {
    assert.equal(find('.goal').length, 0);
  });
});

test('creating a task related to a goal', (assert) => {
  server.create('goal', { description: 'Feel comfortable with Node.js development' });
  const description = 'Complete Node.js codeschool lvl 1';
  visit('/');

  click('#add-task');
  fillIn('#input-task', description);
  click('md-checkbox:eq(0)');
  click('#create');

  andThen(() => {
    assert.equal(find('.task').length, 1);
    assert.equal(find('.task:eq(0) p').text(), description);
  });
});
