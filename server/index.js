import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import questionRoutes from './routes/questions.js';
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import answerRoutes from './routes/answers.js'
import tagRoutes from './routes/tags.js'
import adminRoutes from './routes/admin.js'
// import * as path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

// app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const dbURL = process.env.DB_URL;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Database Connected!!")
});

app.get('/', (req, res) => {
    res.send("Welcom to stack overflow!")
})

// app.use(checkAdmin);
app.use('/admin', adminRoutes);
app.use('/question', questionRoutes);
app.use('/users', userRoutes);
app.use('/question/:id/comment', commentRoutes);
app.use('/question/:id/answer', answerRoutes);
app.use('/tag', tagRoutes);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Welcome to server : ${port}`);
})

