import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {
    
    async execute(req: Request, res: Response) {
        const { email, survey_id } = req.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userExists = await usersRepository.findOne({
            email
        });

        if (!userExists) {
            return res.status(404).json({
                error: 'User not found!'
            });
        }

        const surveyExists = await surveysRepository.findOne({
            id: survey_id
        });
        
        if (!surveyExists) {
            return res.status(404).json({
                error: 'Survey not found!'
            });
        }
        
        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
        const variables = {
            name: userExists.name,
            title: surveyExists.title,
            description: surveyExists.description,
            user_id: userExists.id,
            link: process.env.URL_MAIL
        }

        const surveyUserExists = await surveysUsersRepository.findOne({
            where: [{ user_id: userExists.id }, { survey_id: survey_id }],
            relations: ['user', 'survey']
        });

        if (surveyUserExists) {
            await SendMailService.execute(email, surveyExists.title!, variables, npsPath);
            return res.status(200).json(surveyUserExists);
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userExists.id,
            survey_id: survey_id
        });

        await surveysUsersRepository.save(surveyUser);
        await SendMailService.execute(email, surveyExists.title!, variables, npsPath);

        return res.status(201).json(surveyUser);
    }
}

export { SendMailController };
