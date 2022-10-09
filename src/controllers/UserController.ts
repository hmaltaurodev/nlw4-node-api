import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';
import { ValidateError } from '../errors/ValidateError';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
    
    async create(req: Request, res: Response) {
        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        }
        catch (error) {
            throw new ValidateError('Invalid data', 422, error);
        }

        const { name, email } = req.body;
        const usersRepository = getCustomRepository(UsersRepository);
        const userAlradyExists = await usersRepository.findOne({
            email
        });

        if (userAlradyExists) throw new AppError('User already exists', 403);

        const user = usersRepository.create({
            name,
            email
        });

        await usersRepository.save(user);
        return res.status(201).json(user);
    }
}

export { UserController };
