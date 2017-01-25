export function initialize(application) {
  application.inject('route', 'application', 'service:session-manager');
}

export default {
  name: 'session-manager',
  initialize
};
