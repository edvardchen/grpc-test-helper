import lodash from 'lodash';
import {
  UntypedServiceImplementation,
  ServiceDefinition,
  UntypedHandleCall,
  ServerWritableStream,
} from '@grpc/grpc-js';

export default function mockImplementations(
  pkgDef: ServiceDefinition,
  userImplementation?: UntypedServiceImplementation
) {
  const result = lodash.transform(
    pkgDef,
    (
      acc,
      {
        // @ts-ignore
        responseType,
        responseStream,
      },
      key
    ) => {
      if (!acc[key])
        // @ts-ignore
        acc[key] = ((call, callwback) => {
          if (responseStream) {
            const streamCall = call as ServerWritableStream<unknown, unknown>;
            streamCall.write({});
            streamCall.end();
            return;
          }
          callwback(
            null,
            // function 表示是静态生成的 grpc 代码
            typeof responseType === 'function' ? new responseType() : {}
          );
        }) as UntypedHandleCall;
    },
    userImplementation
  );
  return result;
}
