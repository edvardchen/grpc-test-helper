// GENERATED CODE -- DO NOT EDIT!

// package: routeguide
// file: __tests__/fixtures/protos/route_guide.proto

import * as __tests___fixtures_protos_route_guide_pb from './route_guide_pb';
import * as grpc from '@grpc/grpc-js';

interface IRouteGuideService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  getFeature: grpc.MethodDefinition<
    __tests___fixtures_protos_route_guide_pb.Point,
    __tests___fixtures_protos_route_guide_pb.Feature
  >;
  listFeatures: grpc.MethodDefinition<
    __tests___fixtures_protos_route_guide_pb.Rectangle,
    __tests___fixtures_protos_route_guide_pb.Feature
  >;
  recordRoute: grpc.MethodDefinition<
    __tests___fixtures_protos_route_guide_pb.Point,
    __tests___fixtures_protos_route_guide_pb.RouteSummary
  >;
  routeChat: grpc.MethodDefinition<
    __tests___fixtures_protos_route_guide_pb.RouteNote,
    __tests___fixtures_protos_route_guide_pb.RouteNote
  >;
}

export const RouteGuideService: IRouteGuideService;

export class RouteGuideClient extends grpc.Client {
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: object
  );
  getFeature(
    argument: __tests___fixtures_protos_route_guide_pb.Point,
    callback: grpc.requestCallback<
      __tests___fixtures_protos_route_guide_pb.Feature
    >
  ): grpc.ClientUnaryCall;
  getFeature(
    argument: __tests___fixtures_protos_route_guide_pb.Point,
    metadataOrOptions: grpc.Metadata | grpc.CallOptions | null,
    callback: grpc.requestCallback<
      __tests___fixtures_protos_route_guide_pb.Feature
    >
  ): grpc.ClientUnaryCall;
  getFeature(
    argument: __tests___fixtures_protos_route_guide_pb.Point,
    metadata: grpc.Metadata | null,
    options: grpc.CallOptions | null,
    callback: grpc.requestCallback<
      __tests___fixtures_protos_route_guide_pb.Feature
    >
  ): grpc.ClientUnaryCall;
  listFeatures(
    argument: __tests___fixtures_protos_route_guide_pb.Rectangle,
    metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null
  ): grpc.ClientReadableStream<
    __tests___fixtures_protos_route_guide_pb.Feature
  >;
  listFeatures(
    argument: __tests___fixtures_protos_route_guide_pb.Rectangle,
    metadata?: grpc.Metadata | null,
    options?: grpc.CallOptions | null
  ): grpc.ClientReadableStream<
    __tests___fixtures_protos_route_guide_pb.Feature
  >;
  recordRoute(
    callback: grpc.requestCallback<
      __tests___fixtures_protos_route_guide_pb.RouteSummary
    >
  ): grpc.ClientWritableStream<__tests___fixtures_protos_route_guide_pb.Point>;
  recordRoute(
    metadataOrOptions: grpc.Metadata | grpc.CallOptions | null,
    callback: grpc.requestCallback<
      __tests___fixtures_protos_route_guide_pb.RouteSummary
    >
  ): grpc.ClientWritableStream<__tests___fixtures_protos_route_guide_pb.Point>;
  recordRoute(
    metadata: grpc.Metadata | null,
    options: grpc.CallOptions | null,
    callback: grpc.requestCallback<
      __tests___fixtures_protos_route_guide_pb.RouteSummary
    >
  ): grpc.ClientWritableStream<__tests___fixtures_protos_route_guide_pb.Point>;
  routeChat(
    metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null
  ): grpc.ClientDuplexStream<
    __tests___fixtures_protos_route_guide_pb.RouteNote,
    __tests___fixtures_protos_route_guide_pb.RouteNote
  >;
  routeChat(
    metadata?: grpc.Metadata | null,
    options?: grpc.CallOptions | null
  ): grpc.ClientDuplexStream<
    __tests___fixtures_protos_route_guide_pb.RouteNote,
    __tests___fixtures_protos_route_guide_pb.RouteNote
  >;
}
