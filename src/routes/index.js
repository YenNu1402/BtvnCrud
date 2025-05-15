import express from 'express'
import userRoutes from './apis/user.route.js'
import authRoutes from './apis/auth.route.js'
import uploadLocal from './apis/attachment.route.js'
import attachmentRouter from './apis/attachment.route.js'

const routes = express.Router()

routes.use( "/users",  userRoutes )
routes.use( "/auth",  authRoutes )
routes.use( "/upload",  uploadLocal )
routes.use('/attachments', attachmentRouter)

export default routes
