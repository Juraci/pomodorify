import { test, skip } from 'qunit';
import moduleForAcceptance from 'pomodorify/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | create goal');

test('a user should be able to see his goals', (assert) => {
  const userA = server.create('user', { email: 'example@email.com' });
  const userB = server.create('user', { email: 'example2@email.com' });
  server.create('goal', {
    userId: userA.id,
    description: 'Feel comfortable with Node.js development'
  });

  server.create('goal', {
    userId: userB.id,
    description: 'Becoming goal from user A'
  });

  visit('/');

  fillIn('#input-email', 'example@email.com');
  click('#login');

  andThen(() => {
    assert.equal(find('.goal').length, 1);
    assert.equal(find('.goal:eq(0) p').text(), 'Feel comfortable with Node.js development');
  });
});

test('creating a goal', (assert) => {
  server.create('user', { email: 'example@email.com' });
  const description = 'Feel comfortable with Node.js backend development';

  visit('/');

  fillIn('#input-email', 'example@email.com');
  click('#login');

  click('#add-goal');
  fillIn('#input-goal', description);
  click('#create');

  andThen(() => {
    assert.equal(find('.goal').length, 1);
    assert.equal(find('.goal:eq(0) p').text(), description);
  });
});


test('creating a task related to a goal', (assert) => {
  const user = server.create('user', { email: 'example@email.com' });
  server.create('goal', {
    userId: user.id,
    description: 'Feel comfortable with Node.js development'
  });
  const description = 'Complete Node.js codeschool lvl 1';

  visit('/');

  fillIn('#input-email', 'example@email.com');
  click('#login');

  click('.goal:eq(0) button');
  click('#add-task');
  fillIn('#input-task', description);
  click('#create');

  andThen(() => {
    assert.equal(find('.task').length, 1);
    assert.equal(find('.task:eq(0) p').text(), description);
  });
});

test('adding pomodoro unit to a task', (assert) =>{
  const user = server.create('user', { email: 'example@email.com' });
  const goal = server.create('goal', {
    userId: user.id,
    description: 'Learn Microservices'
  });
  server.create('task', { goalId: goal.id, description: 'Microservices book - Read Chapter 1' });

  visit('/');

  fillIn('#input-email', 'example@email.com');
  click('#login');

  click('.goal:eq(0) button');
  click('.task:eq(0) .add-pomodoro-unit');

  andThen(() => {
    assert.equal(find('.task:eq(0) .total-pomodoros').text(), '1');
  });
});

test('seeing total pomodoros done for a specific goal', (assert) => {
  const user = server.create('user', { email: 'example@email.com' });
  const goal = server.create('goal', {
    userId: user.id,
    description: 'Feel comfortable with JavaScript development'
  });
  server.create('task', {
    goalId: goal.id,
    description: '[Book] - Object Oriented JS - chapter 1',
    pomodoros: 3
  });

  server.create('task', {
    goalId: goal.id,
    description: '[Online course] - ES2015 - level 1',
    pomodoros: 4
  });

  visit('/');

  fillIn('#input-email', 'example@email.com');
  click('#login');

  click('.goal:eq(0) button');

  andThen(() => {
    assert.equal(find('#goal-report .total-pomodoros').text(), '7');
  });
});

skip('deleting a goal', (assert) => {
  server.create('goal', { description: 'Feel comfortable with Node.js development' });

  visit('/');

  fillIn('#input-email', 'example@email.com');
  click('#login');

  click('.goal:eq(0) .delete');

  andThen(() => {
    assert.equal(find('.goal').length, 0);
  });
});
