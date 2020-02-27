import lodash from 'lodash';
import {
  Server,
  loadPackageDefinition,
  ServiceDefinition,
  ServerCredentials,
} from 'grpc';
import { loadSync } from '@grpc/proto-loader';
import mockImplementations from './mockImplementations';
import randomPort from './randomPort';
import getServiceName from './util/getServiceName';

/**
 * 从 ServiceDefinition 初始化 Server
 */
export function startServer({
  Service,
  port = randomPort(),
  implementations,
}: {
  port?: number;
  implementations?: unknown;
  Service: ServiceDefinition<unknown>;
}) {
  const server = new Server();

  server.addService(Service, mockImplementations(Service, implementations));

  const boundPort = server.bind(
    `localhost:${port}`,
    ServerCredentials.createInsecure()
  );

  if (!boundPort)
    throw new Error(`start server ${getServiceName(Service)} failed`);

  server.start();

  return { server, port };
}

/**
 * 从 PB 文件初始化 Server
 */
export function startServerDynamically({
  PBFile,
  serviceName,
  ...rest
}: {
  PBFile: string;
  serviceName: string;
  port?: number;
  implementations?: unknown;
}) {
  const pkgDef = loadSync(PBFile, { defaults: true, objects: true });
  const grpcObject = loadPackageDefinition(pkgDef);

  const Service = lodash.get(grpcObject, `${serviceName}.service`);

  return startServer({
    Service,
    ...rest,
  });
}
