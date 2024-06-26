const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const { Session } = require('./auth/Session.schema');
const http = require('http');
const WebSocket = require('ws');
const startWebSocketServer = require('./webSocket/WebsocketServer');
require('dotenv').config();

// Routes import
const { userRoutes } = require('./api/User/User.routes');
const { lobbyRoutes } = require('./api/Lobby/Lobby.routes');
const { authRoutes } = require('./auth/routes');
const { gameRoutes } = require('./gameApi/routes');

// Store
const { store } = require('./auth/constants');

// Middleware
const { attachUser } = require('./auth/auth.middleware');

const app = express();

const PORT = process.env.PORT;

const sessionParser = session({
  name: 'session',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  // unset: 'destroy',
  cookie: { httpOnly: false, secure: true, sameSite: 'none', maxAge: 86400000, domain: 'winnable-hfythhryta-uw.a.run.app' }, // not sure if should set to destroy
  store,
});

app.use(sessionParser);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);
app.use((req, res, next) => {
  // Attach user to req.session from mongo session store
  // console.log('FETCHING MIDDLEWARE req.session.id', req.session.id);
  // if (req.session.id) {
  //   try {
  //     const session = await Session.findById(req.session.id);
  //     console.log(session);
  //   } catch (error) {
  //     console.log('FETCHING MIDDLEWARE ERROR', error);
  //   }
  //   next();
  //   store.get(req.session.id, (error, session) => {
  //     console.log('FETCHING MIDDLEWARE session', session);
  //     if (session) {
  //       console.log('SESSION FOUND with id', req.session.id);
  //       req.session.user = session.user;
  //     } else {
  //       console.log('NO SESSION FOUND with id', req.session.id);
  //       // req.session.user = { id: "65fa33d0b39ee489c2a0ad79", username:"juantootree4"};
  //       if (error) console.log('FETCHING MIDDLEWARE ERROR', error);
  //     }
  //     next();
  //   });
  // } else {
  //   next();
  // }
  console.log('SUM MIDDLEWARE WITH SESS ID ', req.session.id)
  attachUser(req, res, next).catch(next)
});

const server = http.createServer(app);

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log(`Successfully connected to MongoDB`);
    // start websocket server
    startWebSocketServer(sessionParser, server);
    // Routes
    app.use('/api/user', userRoutes);
    app.use('/api/lobby', lobbyRoutes);
    app.use('/api/auth', authRoutes);
    app.use('/api/game', gameRoutes);

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
  });
