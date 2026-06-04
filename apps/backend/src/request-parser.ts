import http from "node:http";

export class RequestParser {
    public static async json(request: http.IncomingMessage): Promise<any> {
        return new Promise(
            (resolve, reject) => {

                let body = "";

                request.on(
                    "data",
                    chunk => body += chunk
                );

                request.on(
                    "end",
                    () => resolve(
                        JSON.parse(body)
                    )
                );

                request.on(
                    "error",
                    reject
                );
            }
        );
    }
}