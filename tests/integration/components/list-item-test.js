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
  this.set('routeAction', () => {});

  this.render(hbs`{{list-item goal=goal onClick=routeAction}}`);
  assert.equal(this.$('p').text().trim(), goal.get('description'));
});
