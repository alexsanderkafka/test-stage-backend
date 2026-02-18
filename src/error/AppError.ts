import { HttpError } from "routing-controllers";

export default class AppError extends HttpError {

    private msg: string;

    constructor(msg: string, statusCode: number) {
        super(statusCode);
        this.msg = msg;
        Object.setPrototypeOf(this, AppError.prototype);
    }

    toJSON() {
        return {
            timestamp: new Date(),
            statusCode: this.httpCode,
            message: this.msg,
        }
    }
}