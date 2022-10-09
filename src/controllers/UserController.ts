import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { UsersRepository } from '../repositories/UsersRepository';

class UserController {
    
    async create(req: Request, res: Response) {
        const { name, email } = req.body;

        const schema = yup.object().shape({
            name: yup.string().required(),
            email: yup.string().email().required()
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
        }
        catch (err) {
            return res.status(422).json({
                message: 'Invalid data!',
                error: err
            });
        }

        const usersRepository = getCustomRepository(UsersRepository);
        const userAlradyExists = await usersRepository.findOne({
            email
        });

        if (userAlradyExists) {
            return res.status(400).json({
                error: 'User already exists!'
            });
        }

        const user = usersRepository.create({
            name,
            email
        });

        await usersRepository.save(user);

        return res.status(201).json(user);
    }
}

export { UserController };
