import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
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

        if (!userExists) throw new AppError('User not found', 404);

        const surveyExists = await surveysRepository.findOne({
            id: survey_id
        });
        
        if (!surveyExists) throw new AppError('Survey not found', 404);
        
        const surveyUserExists = await surveysUsersRepository.findOne({
            where: { user_id: userExists.id, value: null },
            relations: ['user', 'survey']
        });

        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
        const variables = {
            name: userExists.name,
            title: surveyExists.title,
            description: surveyExists.description,
            id: '',
            link: process.env.URL_MAIL
        }

        if (surveyUserExists) {
            variables.id = surveyUserExists.id!;
            await SendMailService.execute(email, surveyExists.title!, variables, npsPath);
            return res.status(200).json(surveyUserExists);
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userExists.id,
            survey_id: survey_id
        });

        await surveysUsersRepository.save(surveyUser);
        
        variables.id = surveyUser.id!;
        await SendMailService.execute(email, surveyExists.title!, variables, npsPath);

        return res.status(201).json(surveyUser);
    }
}

export { SendMailController };
