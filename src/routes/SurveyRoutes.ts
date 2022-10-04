import { Router } from "express";
import { SurveyController } from "../controllers/SurveyController";

const surveyRouter = Router();
const surveyController = new SurveyController();

surveyRouter.get("/surveys", surveyController.show);
surveyRouter.post("/surveys", surveyController.create);

export { surveyRouter };
