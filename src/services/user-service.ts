import { User as Users } from '../db/models'
import { SignUpInfo, SignUpResponse } from '../interfaces/user-interface'
import { CallbackError } from '../interfaces/error-interface'

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
  }
}

export default userServices