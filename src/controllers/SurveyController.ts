import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveyController {
    
    async create(req: Request, res: Response) {
        const { title, description } = req.body;
        const surveysRepository = getCustomRepository(SurveysRepository);

        const survey = surveysRepository.create({
            title,
            description
        });

        await surveysRepository.save(survey);

        return res.status(201).json(survey);
    }

    async show(req: Request, res: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository);
        const all = await surveysRepository.find();
        
        return res.status(200).json(all);
    }
}

export { SurveyController };
