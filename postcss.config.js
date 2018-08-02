//后处理优化css，比如加-webkit-前缀等
const autoprefixer = require('autoprefixer');

module.exports = {
    plugin: [
        autoprefixer()
    ]
};