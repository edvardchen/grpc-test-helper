import lodash from 'lodash';
import {
  Server,
  loadPackageDefinition,
  ServiceDefinition,
  ServerCredentials,
  UntypedServiceImplementation,
} from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import mockImplementations from './mockImplementations';
import randomPort from './randomPort';
import { promisify } from 'util';
import { ServiceClientConstructor } from '@grpc/grpc-js/build/src/make-client';

/**
 * 从 ServiceDefinition 初始化 Server
 */
export async function startServer({
  Service,
  port = randomPort(),
  implementations,
}: {
  port?: number;
  implementations?: UntypedServiceImplementation;
  Service: ServiceDefinition<UntypedServiceImplementation>;
}) {
  const server = new Server();

  server.addService(Service, mockImplementations(Service, implementations));

  await promisify(server.bindAsync.bind(server))(
    `localhost:${port}`,
    ServerCredentials.createInsecure()
  );

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
  implementations?: UntypedServiceImplementation;
}) {
  const pkgDef = loadSync(PBFile, { defaults: true, objects: true });
  const grpcObject = loadPackageDefinition(pkgDef);

  const Service = (lodash.get(
    grpcObject,
    `${serviceName}`
  ) as ServiceClientConstructor).service;

  return startServer({
    Service,
    ...rest,
  });
}
