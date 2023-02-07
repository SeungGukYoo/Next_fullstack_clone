const express = require('express');
const cors = require('cors');
const seesion = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
const app = express();
const passportConfig = require('./passport');
const passport = require('passport');
db.sequelize
  .sync()
  .then(() => console.log('db 연결 성공'))
  .catch(console.error);

passportConfig();
dotenv.config();

app.use(cors({ origin: 'http://localhost:3060', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('nodebirdsecret'));
app.use(seesion({ saveUninitialized: false, resave: false, secret: process.env.COOKIE_SECRET }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

// "/" 로컬호스트 자체(http:localhost:3065/), 만약 /image로 작성하면 http:localhost:3065/image/_dirname(현재폴더, bak폴더)의 uploads폴더
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/hashtag', hashtagRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('sever running');
});
