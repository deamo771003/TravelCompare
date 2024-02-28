import { User as Users } from '../db/models'
import { SignUpInfo, SignUpResponse } from '../interfaces/user-interface'
import { CallbackError } from '../interfaces/error-interface'
import * as jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
import { loadSecrets } from '../helpers/loadSecrets'


const userServices = {
  signup: (
    { username, password }: SignUpInfo,
    cb: (err: CallbackError | null, result?: SignUpResponse) => void
  ): void => {
    Users.create({
      username,
      password
    })
    .then(user => {
        const userData = user.toJSON();
        delete userData.password;
        cb(null, {
          status: 'success',
          user: userData
        });
      })
      .catch(err => cb(err as CallbackError));
  },
  signIn: async (req: any, cb: any) => {
    try {
      if ( process.env.NODE_ENV == 'production' ) {
        await loadSecrets()
      }
      if (!process.env.JWT_SECRET) throw new Error('Undefined JWT_SECRET!')
      const { password, ...userData } = req.body
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1d' })
      cb(null, {
        status: 'success',
        data: {
          token,
          userData
        }
      })
    } catch (err) {
      cb(err)
    }
  }
}

export default userServices