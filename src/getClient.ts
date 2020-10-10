import lodash from 'lodash';
import loadPB from './loadPB';
import { Client, credentials } from '@grpc/grpc-js';

export function getClient(pb: string, service: string, port: number) {
  const grpcObject = loadPB(pb);

  const Service = lodash.get(grpcObject, service) as typeof Client;

  return new Service(`localhost:${port}`, credentials.createInsecure());
}
