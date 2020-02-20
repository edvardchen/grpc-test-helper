import lodash from 'lodash';
import {
  Server,
  loadPackageDefinition,
  ServiceDefinition,
  ServerCredentials,
} from 'grpc';
import { loadSync } from '@grpc/proto-loader';
import mockImplementations from './mockImplementations';

export function startServer(
  pb: string,
  service: string,
  port: number,
  implementations?: unknown
) {
  const server = new Server();

  const pkgDef = loadSync(pb, { defaults: true, objects: true });
  const grpcObject = loadPackageDefinition(pkgDef);

  const ServiceClass = lodash.get(grpcObject, service);
  server.addService(
    // @ts-ignore
    ServiceClass.service,
    mockImplementations(
      lodash.get(pkgDef, service) as ServiceDefinition<unknown>,
      implementations
    )
  );

  const boundPort = server.bind(
    `localhost:${port}`,
    ServerCredentials.createInsecure()
  );

  if (!boundPort) throw new Error(`start server ${service} failed`);

  server.start();

  return server;
}
