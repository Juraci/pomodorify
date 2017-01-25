import DS from 'ember-data';
import Config from 'pomodorify/config/environment';

let host;

if(Config.environment === 'production') {
  host = Config.APP.prodUrl;
} else {
  host = Config.APP.devUrl;
}

export default DS.JSONAPIAdapter.extend({
  host,
  headers: {
    'Content-Type': 'application/json'
  }
});
