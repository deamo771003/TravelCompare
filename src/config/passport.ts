import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../db/models'
import * as bcrypt from 'bcrypt'

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
      .then(user => {
        if (!user) return cb(null, false, { message:'帳號或密碼輸入錯誤！' })
        bcrypt.compare(password, user.password)
          .then(res => {
            if (!res) return cb(null, false, { message: '帳號或密碼輸入錯誤！'})
            return cb(null, user)
          })
      })
      .catch(err => cb(err, false, { message: 'Database query error.'}))
  }
))

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, cb) => {
  return User.findByPk(id)
    .then(user => {
      if (user === null) {
        cb(null, false)
      } else {
        cb(null, user.toJSON())
      }
    })
    .catch(err => cb(err))
})

export default passport