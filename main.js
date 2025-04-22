import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// import session from 'express-session';
// import flash from 'connect-flash';
import router from './src/routes/index.js';
import viewRoutes from './src/routes/apis/user.route.js'
import db from './src/database/mongodb.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret: process.env.SESSION_SECRET || 'secret',
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(flash());

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Static Files
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Routes
// app.get('/', async (req, res) => {
//     try {
//         const users = await userService.GetAll();
//         res.render('home', {
//             users,
//             message: req.flash('message'),
//             messageType: req.flash('messageType')
//         });
//     } catch (err) {
//         console.error('Error fetching users:', err);
//         res.render('home', {
//             users: [],
//             message: 'Error fetching users',
//             messageType: 'error'
//         });
//     }
// });
app.use('/api', router);
// app.use('/', viewRoutes);

// Error Handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    if (req.accepts('html')) {
        res.status(500).render('error', { message: err.message });
    } else {
        res.status(500).json({ error: err.message });
    }
});

const startServer = async ()=>{
    try {
        await db.getDB();
        console.log("MongoDB server started");
    } catch (error) {
        console.error("Error starting server:", error)
        throw error;
        
    }
}
startServer();

const Port = process.env.PORT || 5000
app.listen(Port, (req, res) => {
    console.log(`Server run at http://localhost:${Port}`)
})