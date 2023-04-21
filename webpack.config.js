const node = { fs: 'empty' };

const Dotenv = require('dotenv-webpack');
module.exports = {
    plugins: [
        new Dotenv()
    ]
}