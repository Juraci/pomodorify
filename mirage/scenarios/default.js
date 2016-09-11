export default function(server) {
  server.logging = true;
  server.create('goal', { description: 'Feel comfortable with Node.js development' });
  server.create('goal', { description: 'Feel comfortable with front end development' });

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  // server.createList('post', 10);
}
