import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  pomodoros: DS.attr('number'),
  goal: DS.belongsTo('goal'),
});
