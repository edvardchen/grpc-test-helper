import path from 'path';
import { Server } from 'grpc';
import {
  unaryCallThenShutdown,
  getClient,
  startServerDynamically,
  startServer,
} from '../src';
import { RouteGuideService } from './fixtures/static_codegen/route_guide_grpc_pb';

describe('startServer', () => {
  const PBFile = path.resolve(__dirname, 'fixtures/protos/route_guide.proto');
  const serviceName = 'routeguide.RouteGuide';

  describe('statically', () => {
    let server: Server;
    let port;
    beforeAll(() => {
      const result = startServer({ Service: RouteGuideService });
      server = result.server;
      port = result.port;
    });
    afterAll(done => {
      server.tryShutdown(done);
    });

    it('unary', async () => {
      const result = await unaryCallThenShutdown(
        getClient(PBFile, serviceName, port),
        server,
        'getFeature'
      );
    });
  });

  describe('dynamically', () => {
    let server: Server;
    let port;
    beforeAll(() => {
      const result = startServerDynamically({ PBFile, serviceName });
      server = result.server;
      port = result.port;
    });
    afterAll(done => {
      server.tryShutdown(done);
    });

    it('unary', async () => {
      await unaryCallThenShutdown(
        getClient(PBFile, serviceName, port),
        server,
        'getFeature'
      );
    });
  });
});
