import DS from 'ember-data';
import Config from 'pomodorify/config/environment';

let host;

if(Config.environment === 'production') {
  host = 'https://pomodorify-backend.herokuapp.com';
} else {
  host = 'http://localhost:3000';
}

export default DS.JSONAPIAdapter.extend({
  host,
  headers: {
    'Content-Type': 'application/json'
  }
});
