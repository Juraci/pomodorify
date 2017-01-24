export default function() {
  this.urlPrefix = 'http://localhost:3000';

  this.get('/goals', ({ goals }, request) => {
    const userId = request.queryParams['filter[userId]'];
    return goals.where({ userId });
  });

  this.post('/goals');
  this.patch('/goals/:id');
  this.del('/goals/:id');
  this.get('/goals/:id');

  this.post('/tasks');
  this.get('/tasks');
  this.get('/tasks/:id');
  this.patch('/tasks/:id');

  this.get('/users', ({ users }, request) => {
    const email = request.queryParams['filter[email]'];
    return users.where({ email });
  });

  this.get('/users/:id');
  this.patch('/users/:id');

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */
}
