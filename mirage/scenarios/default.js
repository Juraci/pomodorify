export default function(server) {
  server.logging = true;
  const goalA = server.create('goal', { description: 'Feel comfortable with Node.js development' });
  server.create('goal', { description: 'Create a full stack JavaScript web app' });
  const goalB = server.create('goal', { description: 'Learn hot to create continuous deployment for heroku' });
  server.create('goal', { description: 'Create a desktop pomodoro app with Ember.js + Electron' });

  server.create('task', {
    description: 'Codeschool - Real time web with node - lvl 1',
    goalId: goalA.id
  });

  server.create('task', {
    description: 'Codeschool - Building blocks of express.js - lvl 1',
    goalId: goalA.id
  });

  server.create('task', {
    description: 'Spike on Node.js app deploy on heroku',
    goalId: goalB.id
  });

  server.create('task', {
    description: 'Learn how to setup postgres database on heroku',
    goalId: goalB.id
  });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
