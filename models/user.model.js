const db = require('../util/supabase');
const bcrypt = require('bcrypt');

module.exports = class User {
    constructor(username, password, name) {
        this.username = username;
        this.password = password;
        this.name = name;
    }

    save() {
        const username = this.username;
        return bcrypt.hash(this.password, 12).then(encryptedPassword => {
            return db.from('users').insert({
                username: username,
                password: encryptedPassword,
                name: this.name,
            });
        }).then(({ error }) => {
            if (error) throw error;
            return db.from('assign').insert({
                username: username,
                id_role: 'user',
            });
        });
    }

    static fetchOne(username) {
        return db.from('users').select('*').eq('username', username);
    }

    static fetchAll() {
        return db.from('users').select('username, name, created_at');
    }

    static deleteUser(username) {
        return db.from('assign').delete().eq('username', username)
            .then(() => {
                return db.from('tasks').delete().eq('username', username);
            })
            .then(() => {
                return db.from('users').delete().eq('username', username);
            });
    }

    static fetchPrivileges(username) {
        return db.from('assign')
            .select('id_role')
            .eq('username', username)
            .then(({ data: roles, error }) => {
                if (error) throw error;
                if (!roles || roles.length === 0) return { data: [], error: null };
                const roleIds = roles.map(r => r.id_role);
                return db.from('rbac')
                    .select('privileges(name_privilege)')
                    .in('id_role', roleIds);
            });
    }

    static fetchAllRoles() {
        return db.from('roles').select('*');
    }

    static fetchUserRoles(username) {
        return db.from('assign').select('id_role, roles(name_role)').eq('username', username);
    }

    static assignRole(username, id_role) {
        return db.from('assign').insert({ username: username, id_role: id_role });
    }

    static removeRole(username, id_role) {
        return db.from('assign').delete().eq('username', username).eq('id_role', id_role);
    }
}
