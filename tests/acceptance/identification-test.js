import { test } from 'qunit';
import moduleForAcceptance from 'pomodorify/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | identification', {
  beforeEach() {
    window.localStorage.clear();
  }
});

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

test('a user tries to enter an email that does not exist', (assert) => {
  visit('/');

  fillIn('#input-email', 'example@email.com');
  triggerEvent('#input-email', 'blur');
  click('#login');

  andThen(() => {
    assert.equal(find('.paper-input-error').text().trim(), 'You shall not pass');
  });
});

test('a user tries to go to an url without being identified', (assert) => {
  visit('/goals');

  andThen(() => {
    assert.equal(currentURL(), '/login');
  });
});

test('a user already identified should not see the identification page', (assert) => {
  const user = server.create('user', { email: 'example@email.com' });
  window.localStorage.setItem('email', user.email);
  window.localStorage.setItem('id', user.id);

  visit('/login');

  andThen(() => {
    assert.equal(currentURL(), '/goals');
  });
});
