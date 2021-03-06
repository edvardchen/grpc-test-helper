import { loadSync } from '@grpc/proto-loader';
import { loadPackageDefinition } from '@grpc/grpc-js';

export default function loadPB(pb: string) {
  const pkgDef = loadSync(pb, { defaults: true, objects: true });
  const grpcObject = loadPackageDefinition(pkgDef);
  return grpcObject;
}
