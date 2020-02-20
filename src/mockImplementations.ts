import lodash from 'lodash';
import { ServiceDefinition, handleUnaryCall } from 'grpc';

export default function mockImplementations(
  pkgDef: ServiceDefinition<any>,
  userImplementation: any = {}
) {
  const result = lodash.transform(
    pkgDef,
    (
      acc: { [key: string]: handleUnaryCall<any, any> },
      // @ts-ignore
      { responseType },
      key
    ) => {
      if (!acc[key])
        acc[key] = (call, callwback) => {
          callwback(
            null,
            // function 表示是静态生成的 grpc 代码
            typeof responseType === 'function' ? new responseType() : {}
          );
        };
    },
    userImplementation
  );
  return result;
}
