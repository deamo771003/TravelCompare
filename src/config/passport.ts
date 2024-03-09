import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../db/models'
import * as bcrypt from 'bcrypt'

export interface userTable {
  id?: string
  email: string
  name: string
  password: string
  admin: boolean
}

passport.use(new LocalStrategy(
  // customize user field
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  // authenticate user
  (req, email, password, cb) => {
    User.findOne({ where: { email } })
      .then((user: userTable | null)  => {
        if (!user) return cb(null, false, { message:'Incorrect account or password!' })
        bcrypt.compare(password, user.password)
          .then(res => {
            if (!res) return cb(null, false, { message: 'Incorrect account or password!'})
            return cb(null, user)
          })
      })
      .catch(err => cb(err, false, { message: 'Database query error.'}))
  }
))

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: any, cb) => {
  return User.findByPk(id)
    .then((user: any) => {
      if (user === null) {
        cb(null, false)
      } else {
        const userTableInstance: userTable = user.toJSON()
        cb(null, userTableInstance)
      }
    })
    .catch(err => cb(err))
})

export default passport