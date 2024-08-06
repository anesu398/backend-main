// Import example data
const { exampleToken, exampleAreas, exampleUsers } = require('./exampleData');

// Use example data in your tests
describe('Example API Tests', () => {
  it('should return status 200 for protected route with example token', () => {
    // Make an HTTP request to your protected route using exampleToken
    // Assert that the response status code is 200
  });

  it('should return example areas when fetching areas', () => {
    // Make an HTTP request to your areas endpoint
    // Assert that the response contains exampleAreas
  });

  // Write more tests using example data as needed
});