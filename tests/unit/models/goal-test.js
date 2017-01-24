import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('goal', 'Unit | Model | goal', {
  // Specify the other units that are required for this test.
  needs: ['model:task', 'model:user']
});

test('it exists', function(assert) {
  const model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('should return the sum of pomodoros from all its tasks', function(assert) {
  assert.expect(2);
  const subject = this.subject({ description: 'foo' });
  let taskA;
  let taskB;

  Ember.run(() => {
    taskA = subject.store.createRecord('task', { description: 'bar', pomodoros: 1 });
    taskB = subject.store.createRecord('task', { description: 'baz', pomodoros: 2 });
    subject.get('tasks').pushObjects([taskA, taskB]);
  });

  assert.equal(subject.get('description'), 'foo');
  assert.equal(subject.get('pomodoros'), 3);
});

test('should return 0 if there are not tasks', function(assert) {
  assert.expect(1);
  const subject = this.subject({ description: 'foo' });

  assert.equal(subject.get('pomodoros'), 0);
});
