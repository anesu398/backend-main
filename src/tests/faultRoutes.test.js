const request = require('supertest');
const { app } = require('../server');
const mongoose = require('mongoose');

beforeAll(async () => {
  // Connect to the test database
  const url = `mongodb://127.0.0.1/zetdc_test_db`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Disconnect from the test database
  await mongoose.connection.close();
});

describe('Fault Reporting API', () => {
  it('should report a new fault', async () => {
    const res = await request(app)
      .post('/api/faults')
      .send({
        userId: new mongoose.Types.ObjectId(),
        suburb: 'Test Suburb',
        description: 'Power outage in the area'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('fault');
    expect(res.body.fault).toHaveProperty('_id');
  });

  it('should get all faults for a specific suburb', async () => {
    const suburb = 'Test Suburb';
    await request(app)
      .post('/api/faults')
      .send({
        userId: new mongoose.Types.ObjectId(),
        suburb,
        description: 'Power outage in the area'
      });

    const res = await request(app).get(`/api/faults/${suburb}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('faults');
    expect(res.body.faults).toBeInstanceOf(Array);
  });
});
