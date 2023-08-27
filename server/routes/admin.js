import AdminBro from 'admin-bro';
import AdminBroMongoose from 'admin-bro-mongoose';
import pkg from 'admin-bro-expressjs';
const { buildRouter } = pkg;
import User from '../models/users.js';
import Tag from '../models/tags.js';
import Answer from '../models/answers.js';
import Comment from '../models/comments.js';
import Question from '../models/questions.js';


AdminBro.registerAdapter(AdminBroMongoose)



const options = {
    resources: [User, Tag, Answer, Comment, Question],
};

const adminBro = new AdminBro(options)


export default buildRouter(adminBro);



