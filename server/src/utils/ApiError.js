class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", Errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.message = message; // `super` already sets this.message; no need to reassign
        this.Errors = Errors; // Use `Errors` consistently

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor); // Correct usage
        }
    }
}

export { ApiError };
