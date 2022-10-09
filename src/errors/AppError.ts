class AppError {
    public readonly message: string;
    public readonly statusCode: number;
    public readonly err?: Object;

    constructor(message: string, statusCode: number, err?: Object) {
        this.message = message;
        this.statusCode = statusCode;
        this.err = err;
    }
}

export { AppError };
