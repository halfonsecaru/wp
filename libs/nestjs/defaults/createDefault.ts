import { ResponseInterface } from "@libs/shared/interfaces";


export const defaultResponse = (): ResponseInterface => {
    return {
        data: [],
        Timestamps: '',
        path: '',
        error: undefined,
        statusCode: 501,
        message: 'Error'
    } as ResponseInterface;
}

export const customResponse = (
    data: any[] = [],
    timestamps: string = new Date().toISOString(),
    path: string = '',
    error: any = undefined,
    statusCode: number = 200,
    message: string = 'Success'
): ResponseInterface => {
    return {
        data,
        Timestamps: timestamps,
        path,
        error,
        statusCode,
        message
    } as ResponseInterface;
}