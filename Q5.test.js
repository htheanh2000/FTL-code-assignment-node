const request = require('supertest');
const app = require('./Q5'); 

describe('API Tests', () => {
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const res = await request(app).get('/users');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message');
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /user', () => {
    it('should add a new user', async () => {
      const newUser = { name: 'John', age: 30 };
      const res = await request(app).post('/user').send(newUser);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', `User ${newUser.name} has been added`);
    });
  });

  describe('PUT /user/:index', () => {
    it('should update an existing user', async () => {
      const updatedUser = { name: 'Jane' };
      const res = await request(app).put('/user/0').send(updatedUser);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'User has been updated');
    });
  });

  describe('DELETE /user/:id', () => {
    it('should delete a user', async () => {
      const res = await request(app).delete('/user/0');
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'User has been deleted');
    });
  });
});
