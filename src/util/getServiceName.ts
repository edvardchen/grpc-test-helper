import path from 'path';
import { ServiceDefinition } from '@grpc/grpc-js';

export default function getServiceName(Service: ServiceDefinition<unknown>) {
  // randomly choose one method. All methods' paths are the same
  const [{ path: fullPath }] = Object.values(Service);

  // pack.age.service
  const serviceName = path.basename(path.dirname(fullPath));
  return serviceName;
}
