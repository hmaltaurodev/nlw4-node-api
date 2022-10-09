import { getCustomRepository, IsNull, Not } from 'typeorm';
import { Request, Response } from "express";
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { AppError } from '../errors/AppError';

class NpsController {

    async execute(req: Request, res: Response) {
        const { survey_id } = req.params;
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveysUsers = await surveysUsersRepository.find({
            where: { survey_id: survey_id, value: Not(IsNull()) }
        });

        if (!surveysUsers) throw new AppError('Surveys Users not found', 404);

        const detractors = surveysUsers.filter(
            (survey) => survey.value! >= 0 && survey.value! <= 6
        ).length;

        const promoters = surveysUsers.filter(
            (survey) => survey.value! >= 9 && survey.value! <= 10
        ).length;

        const passives = surveysUsers.filter(
            (survey) => survey.value! >= 7 && survey.value! <= 8
        ).length;

        const totalAnswers = surveysUsers.length;
        const nps = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2));

        return res.status(200).json({
            detractors,
            promoters,
            passives,
            totalAnswers,
            nps
        });
    }
}

export { NpsController };
