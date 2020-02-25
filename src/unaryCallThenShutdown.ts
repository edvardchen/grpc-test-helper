import { Server } from 'grpc';

export default function unaryCallThenShutdown(
  client: any,
  server: Server,
  method: string
) {
  return new Promise((resolve, reject) => {
    client[method]({}, (error: Error, payload: any) => {
      server.tryShutdown(() => {
        if (error) return reject(error);
        resolve(payload);
      });
    });
  });
}
