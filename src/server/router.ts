import { authRouter as auth } from './routes/auth'
import { usersRouter as users } from './routes/users'

export const serverRouter = {
	users,
	auth,
}
