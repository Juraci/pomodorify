import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    toggleGoal(goal) {
      if(this.controller.get('selectedGoals').contains(goal)) {
        this.controller.get('selectedGoals').removeObject(goal);
      } else {
        this.controller.get('selectedGoals').pushObject(goal);
      }
    },

    createTask() {
      const taskDescription =  this.controller.get('task');
      let taskRecord = this.store.createRecord('task', {
        description: taskDescription,
      });
      this.controller.get('selectedGoals').forEach(goal => {
        taskRecord.get('goals').pushObject(goal);
      });
      taskRecord.save()
        .then(() => {
          Ember.Logger.warn('Task saved!');
          this.controller.get('selectedGoals').forEach(goal => {
            goal.get('tasks').pushObject(taskRecord);
            goal.save()
              .then(() => {
                Ember.Logger.warn('Goal updated');
              })
              .catch(err => {
                Ember.Logger.warn(`Error while trying to update goal\n${err}`);
              });
          });
        })
        .catch(err => {
          Ember.Logger.warn(`Error while trying to save the task:\n${err}`);
        });
    }
  },

  model() {
    return Ember.RSVP.hash({
      goals: this.store.findAll('goal'),
      tasks: this.store.findAll('task')
    });
  }
});
