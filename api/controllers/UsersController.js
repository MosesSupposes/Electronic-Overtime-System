const UsersModel = require('../models/UsersModel')
const bcrypt = require('bcrypt')

class UsersController {
    static async allUsers(req, res) {
        try {
            const allUsers = await UsersModel.allUsers()
            res.status(200).json(allUsers)
        } catch(e) {
            res.status(500).json({ error: { message: "Internal server error." } })
        }
    }

    static async getByUsername(req, res) {
        try {
            const user = await UsersModel.findByUsername(req.params.username)
            ;(user) 
                ? res.status(200).json(user)
                : res.status(404).json({ error: { message: `User ${req.params.username} does not exist.` } })
        } catch(e) {
            res.status(404).json({ error: { message: `User ${req.params.username} does not exist.` } })
        }
    }

    static async updateByUsername(req, res) {
        try {
            const userBeforeUpdate = await UsersModel.findByUsername(req.params.username)
            try {
                if (req.body.password) req.body.password = bcrypt.hashSync(req.body.password, 8)

                const userAfterUpdate = await UsersModel.updateByUsername(req.params.username, req.body)
                if (typeof userAfterUpdate === "string") {
                    const errorMsg = userAfterUpdate
                    res.status(404).json({ error: { message: errorMsg } })
                } else {
                    res.status(200).json({
                        beforeUpdate: userBeforeUpdate,
                        afterUpdate: userAfterUpdate
                    })
                }
            } catch(e) {
                res.status(500).json({ error: { message: "Internal server error." } })
            }
        } catch(e) {
            res.status(404).json({ error: { message: `User ${req.params.username} does not exist.` } })
        }
    }

    static async deleteByUsername(req, res) {
        try {
            const count = await UsersModel.destroyByUsername(req.params.username)
            ;(typeof count === "number")
                ? res.status(200).json({ success: `Deleted user ${req.params.username}`})
                : res.status(404).json({ error: { message: count } })
        } catch(e) {
            res.status(500).json({ error: { message: `User ${req.params.username} does not exist.` } })
        }
    }
}

module.exports = UsersController
