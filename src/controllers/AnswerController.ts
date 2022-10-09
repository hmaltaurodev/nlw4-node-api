import { getCustomRepository } from 'typeorm';
import { Request, Response } from "express";
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { AppError } from '../errors/AppError';

class AnswerController {
    
    async execute(req: Request, res: Response) {
        const { value } = req.params;
        const { id } = req.query;
        
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(id)
        });

        if (!surveyUser) throw new AppError('Survey User not found', 404);

        surveyUser.value = Number(value);
        await surveysUsersRepository.save(surveyUser);

        return res.status(200).json(surveyUser);
    }
}

export { AnswerController };
