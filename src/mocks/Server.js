// mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Create a new mock server instance
const server = setupServer(...handlers);

export { server };
