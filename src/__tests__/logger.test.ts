import { Logger } from '../index';

const logger = {
  debug: 'Somme debug message', // TODO: mock the console log
};

test('Logger to log', () => {
  const logger = Logger.create(['tag1', 'tag2'], 'local');
  expect(logger.debug).toBe('Somme debug message');
});
