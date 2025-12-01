export type THttpResponse = {
    success: boolean;
    statusCode: number;
    request: {
        ip?: string | null;
        url: string;
        method: string;
    };
    message: string;
    data: unknown;
};

export type THttpError = {
    success: boolean;
    statusCode: number;
    request: {
        ip?: string | null;
        url: string;
        method: string;
    };
    message: string;
    data: unknown;
    trace?: object | null;
};
