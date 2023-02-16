import { DBController } from "../../database/DbController.js"

export class visitorControl {}

visitorControl.visitor = {
    add: async(req) => {
        return DBController.visitor.add(req);
    },
    today: async({ token }) => {
        return DBController.visitor.today_visitor(token);
    },
    dayVisitor: async({ token }) => {
        return DBController.visitor.day_count_visitor(token);
    },
    total: async({ token }) => {
        return DBController.visitor.total_visitor(token);
    },
}