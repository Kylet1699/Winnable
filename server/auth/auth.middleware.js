const { Lobby } = require('../api/Lobby/Lobby.schema');
const { Session } = require('./Session.schema');

async function attachUser (req, res, next){
  if (req.session.id) {
    console.log("FETCHING MIDDLEWARE req.session.id", req.session.id);
    try {
      const session = await Session.findOne({_id: req.session.id});
      console.log('FOUND SESSION', session);
    } catch (error) {
      console.log('FETCHING MIDDLEWARE ERROR', error);
    }
  }
  next();
}

const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send('Unauthorized');
  }
  next();
}
  
const requireSameUser = (req, res, next) => {
  if (req.session.user.id !== req.params.id) {
    return res.status(401).send('Unauthorized');
  }
  next();
}

const requireHost = async (req, res, next) => {
  try {
    const lobby = await Lobby.findById(req.params.id);
    if (req.session.user !== lobby.host) {
      return res.status(401).send('Unauthorized');
    }
    next();
  } catch (err) {
    console.error('Error finding lobby: ', err);
    res.status(500).json({ err: 'Failed to get lobby' });
  }
}

module.exports = { requireLogin, requireSameUser, requireHost, attachUser };