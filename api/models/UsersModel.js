const db = require('../database/dbClient')

class UsersModel {
    static allUsers() {
        return db('users')
    }
    
    static findByUsername(username) {
        return db('users')
            .where({username})
            .first()
    }

    static findById(id) {
        return db('users')
            .where({id})
            .first()
    }

    static async create(user) {
        const [id] = await db('users').insert(user)
        return this.findById(id)
    }

    static async updateByUsername(username, changes) {
        const newUsername = changes.username || username
        
        await db('users')
            .update(changes)
            .where({username})

        return this.findByUsername(newUsername)
    }

    static async updateById(id, changes) {
        await db('users')
            .update(changes)
            .where({id})

        return this.findById(id)
    }
    
    static async destroyByUsername(username) {
        return db('users')
            .delete()
            .where({username})
    }

    static async destroyById(id) {
        return db('users')
            .delete()
            .where({id})
    }
}

module.exports = UsersModel