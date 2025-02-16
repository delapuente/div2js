declare class DivError extends Error {
    errorCode: number;
    constructor(errorCode: number, message?: any);
}
export { DivError };
