import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('Is not a valid email')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must have at least 6 characters')
        .required('Password is required'),
    });

    schema.validate(req.body).catch((err) => {
      const messageError = err.errors[0];
      return res.status(400).json({ error: messageError });
    });

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url', 'id'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name, avatar, provider } = user;

    return res.json({
      user: { id, name, email, avatar, provider },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();