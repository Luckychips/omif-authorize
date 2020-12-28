export declare class ValidationError extends Error {
    private statusCode;
    constructor(statusCode: string, message?: string);
}
export declare class JoinError extends Error {
    private statusCode;
    constructor(statusCode: string, message?: string);
}
