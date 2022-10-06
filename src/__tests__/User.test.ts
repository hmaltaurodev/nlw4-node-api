import request from 'supertest';
import { getCustomRepository } from 'typeorm';
import { app } from '../app';
import createConnection from '../database';
import { UsersRepository } from '../repositories/UsersRepository';

describe('Users', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it('Should be able to create a new user', async () => {
        const res = await request(app).post('/users').send({
            name: 'User Example',
            email: 'user@example.com'
        });

        expect(res.status).toBe(201);
    });

    it('Should not be able to create a user with exists email', async () => {
        const res = await request(app).post('/users').send({
            name: 'User Example',
            email: 'user@example.com'
        });

        expect(res.status).toBe(400);
    });

    afterAll(async () => {
        const usersRepository = getCustomRepository(UsersRepository);
        await usersRepository.clear();
    });
});
