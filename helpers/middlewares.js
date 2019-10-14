require('dotenv/config')

function checkAccess(req, res, next) {
  const userpass = new Buffer.from((req.headers.authorization || '').split(' ')[1] || '', 'base64').toString();

  if (userpass == process.env.VUE_APP_USER) {
    next()
  } else {
    res.status(403).json({ message: 'Access are not good' })
  }

}

module.exports = {
  checkAccess
}
