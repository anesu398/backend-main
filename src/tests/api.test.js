// test/api.test.js

(async () => {
    const { expect } = await import('chai');
    const request = await import('supertest');
    const app = await import('../src/index');
    const { exampleToken, exampleAreas } = await import('../exampleData');
  
    describe('ZETDC API Tests', () => {
      it('should return status 200 for GET /loadshedding-status', async () => {
        const res = await request.default(app.default)
          .get('/loadshedding-status')
          .set('Authorization', exampleToken);
        expect(res.status).to.equal(200);
      });
  
      it('should return example areas when GET /areas is called', async () => {
        const res = await request.default(app.default)
          .get('/areas')
          .set('Authorization', exampleToken);
        expect(res.status).to.equal(200);
        expect(res.body).to.deep.equal(exampleAreas);
      });
    });
  })();
  