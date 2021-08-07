require('dotenv').config();
let url = { url: 'mongodb://localhost:27017/assessment' };

if (process.env.NODE_ENV === 'test') {
  url = { url: 'mongodb://localhost:27017/test' };
  // We are running in testing mode
}

module.exports = url;
