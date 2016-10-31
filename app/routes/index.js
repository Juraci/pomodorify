import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    createGoal() {
      this.controller.set('showGoalDialog', false);
      let description = this.controller.get('goal');
      let goal = this.store.createRecord('goal', { description: description });
      goal.save()
        .then(() => {
          this.controller.set('goal', '');
        })
        .catch((err) => {
          Ember.Logger.error(`Error while trying to save goal:\n${err}`);
        });
    },

    deleteGoal(goal) {
      goal.deleteRecord();
      goal.save()
        .then(() => {
          Ember.Logger.warn('Goal deleted!');
        })
        .catch(err => {
          Ember.Logger.error(err);
        });
    },

    openGoalDialog() {
      this.controller.set('showGoalDialog', true);
    },

    closeGoalDialog() {
      this.controller.set('showGoalDialog', false);
    },

    toggleGoal(goal) {
      if(this.controller.get('selectedGoals').contains(goal)) {
        this.controller.get('selectedGoals').removeObject(goal);
      } else {
        this.controller.get('selectedGoals').pushObject(goal);
      }
    },

    createTask() {
      this.controller.set('showTaskDialog', false);
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
    },

    openTaskDialog() {
      this.controller.set('showTaskDialog', true);
    },

    closeTaskDialog() {
      this.controller.set('showTaskDialog', false);
    }
  },

  model() {
    return Ember.RSVP.hash({
      goals: this.store.findAll('goal'),
      tasks: this.store.findAll('task')
    });
  }
});
