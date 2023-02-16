export default class Errors {
    static handleError({ error }) {
        return {
            errors: [
                { message: error }
            ]
        }
    }
}