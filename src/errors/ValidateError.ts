class ValidateError {
    public readonly message: string;
    public readonly code: number;
    public readonly body: Object;

    constructor(message: string, code: number, body: Object) {
        this.message = message;
        this.code = code;
        this.body = body;
    }
}

export { ValidateError };
