import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TestModule } from './utils/test.module';
import viewTemplate from "../src/template";

describe('test', () => {
  let server: { close: () => void; };
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();
    const app = module.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(() => {
    server.close();
  });

  describe('1+1', () => {
    it('should pass', () => {
      expect(1 + 1).toBe(2);
    });
  });

  describe('should render view template with inertia page data', () => {
    it('GET /users', () => {
      const dataPage = JSON.stringify({
        component: 'Users/AllUser',
        props: {
          users: [{
            id: 1,
            name: 'John Doe'
          }]
        },
        url: '/users',
        version: '1'
      });

      return request(server)
        .get('/users')
        .expect(200)
        .expect(viewTemplate(dataPage));
    });
  });

  describe('should render view template with inertia shared and page data', () => {
    it('GET /users/2', () => {
      const dataPage = JSON.stringify({
        component: 'Users/DetailUser',
        props: {
          isLoggedIn: true,
          id: 2,
          name: 'John Doe'
        },
        url: '/users/2',
        version: '1'
      });

      return request(server)
        .get('/users/2')
        .expect(200)
        .expect(viewTemplate(dataPage));
    });
  });

  describe('should return a redirection', () => {
    it('DELETE /users/2', () => {
      return request(server)
        .delete('/users/2')
        .expect(303);
    });
  });
});