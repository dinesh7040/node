import {
    firebaseAdmin
} from './firebase.js'
import {
    DBController
} from '../database/DbController.js'
import {
    createRequire
} from 'module'
const require = createRequire(
    import.meta.url)
import isEmpty from 'lodash/isEmpty.js'

export class Notifier {}

Notifier.User = {
    notifyAUser: async (user_id, message) => {
        try {
            const userFound = await DBController.Models.User.findOne({
                _id: user_id
            }).select('deviceId -_id')
            if (userFound) {
                const notified = await Notifier.Send.toMultiple(userFound.deviceId, {
                    notification: {
                        title: 'Test on user',
                        body: message,
                        image: 'http://c93573cee7bb.ngrok.io/icons/insta.png',
                        icon: 'test'
                    }
                })
                console.log(notified)
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }
}