const db = require('../util/supabase');
const bcrypt = require('bcrypt');

module.exports = class User {
    constructor(username, password, name) {
        this.username = username;
        this.password = password;
        this.name = name;
    }

    save() {
        return bcrypt.hash(this.password, 12).then(encryptedPassword => {
            return db.from('Users').insert({
                username: this.username,
                password: encryptedPassword,
                name: this.name,
            });
        });
    }

    static fetchOne(username) {
        return db.from('Users').select('*').eq('username', username);
    }
}