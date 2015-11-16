/**
 * An API into localStorage that won't explode if it isn't available (like in node.js).
 *
 * Will also serialise and parse with JSON.
 *
 * @type {Object}
 */
var Persistence = {
    write: function (key, value) {
        if (typeof localStorage === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    },
    read: function (key) {
        if (typeof localStorage === 'object') {
            return JSON.parse(localStorage.getItem(key));
        }
    },
    delete: function (key) {
        if (typeof localStorage === 'object') {
            localStorage.removeItem(key);
        }
    }

};

export default Persistence;