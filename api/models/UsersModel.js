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
        const [id] = await db('users').insert(user, 'id')
        return this.findById(id)
    }

    static async updateByUsername(username, changes) {
        const newUsername = changes.username || username
        
        if (await this.findByUsername(username) === undefined) {
            return `No user found with the username ${username}`
        } else {
            await db('users')
                .update(changes)
                .where({username})
    
            return this.findByUsername(newUsername)
        }
    }

    static async updateById(id, changes) {
        if (await this.findById(id) === undefined) {
            return `No user found with the id of ${id}`
        } else {
            await db('users')
                .update(changes)
                .where({id})
    
            return this.findById(id)
        }
    }
    
    static async destroyByUsername(username) {
        if (await this.findByUsername(username) === undefined) {
            return `Couldn't delete user ${username}. That user doesn't exist.`
        } else {
            return db('users')
                .delete()
                .where({username})
        }
        
    }

    static async destroyById(id) {
        if (await this.findById(id) === undefined) {
            return `Couldn't delete user with the id of ${id}. That user doesn't exist.`
        } else {
            return db('users')
                .delete()
                .where({id})
        }
    }
}

module.exports = UsersModel