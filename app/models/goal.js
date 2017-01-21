import DS from 'ember-data';
import Ember from 'ember';
const { computed } = Ember;

export default DS.Model.extend({
  description: DS.attr('string'),
  tasks: DS.hasMany('task'),

  pomodoros: computed('tasks.@each.pomodoros', function() {
    let total = 0;
    this.get('tasks').forEach((t) => {
      total += t.get('pomodoros');
    });
    return total;
  }),
});
