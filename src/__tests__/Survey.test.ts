import request from "supertest";
import { getCustomRepository } from "typeorm";
import { app } from "../app";
import createConnection from '../database';
import { SurveysRepository } from "../repositories/SurveysRepository";

describe("Surveys", () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it("Should be able to create a new survey", async () => {
        const res = await request(app).post("/surveys").send({
            title: "Title Example",
            description: "Description Example"
        });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty("id");
    });

    it("Should be able to get all surveys", async () => {
        await request(app).post("/surveys").send({
            title: "Title Example",
            description: "Description Example"
        });

        const res = await request(app).get("/surveys");

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });

    afterAll(async () => {
        const surveysRepository = getCustomRepository(SurveysRepository);
        await surveysRepository.clear();
    });
});
