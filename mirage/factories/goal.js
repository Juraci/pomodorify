import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  description: faker.lorem.sentence,
});
