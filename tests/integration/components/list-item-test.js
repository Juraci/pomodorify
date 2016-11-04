import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

let goal;

moduleForComponent('list-item', 'Integration | Component | list item', {
  integration: true,

  beforeEach() {
    goal = Ember.Object.create({
      id: 136,
      description: 'Feel comfortable with Node.js development'
    });
  }
});

test('it should render the item description', function(assert) {
  assert.expect(1);

  this.set('goal', goal);
  this.render(hbs`{{list-item goal=goal}}`);
  assert.equal(this.$('p').text().trim(), goal.get('description'));
});

test('it should send a delete action passing the goal as parameter', function(assert) {
  assert.expect(1);

  this.set('goal', goal);
  this.set('routeAction', (item) => {
    assert.equal(item.description, goal.get('description'));
  });

  this.render(hbs`{{list-item goal=goal delete=routeAction}}`);

  this.$('.delete').click();
});

test('it should send addTask action passing the current goal as parameter', function(assert) {
  assert.expect(1);

  this.set('goal', goal);
  this.set('routeAction', (item) => {
    assert.equal(item.id, goal.get('id'));
  });

  this.render(hbs`{{list-item goal=goal openDialog=routeAction}}`);

  this.$('.add-task').click();
});
