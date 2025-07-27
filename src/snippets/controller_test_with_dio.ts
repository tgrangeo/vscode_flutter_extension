export function generateViewControllerTestWithDio(controllerName: string): string {
  return `import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:get/instance_manager.dart';
import 'package:dio/dio.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import '\${TM_FILENAME_BASE}.mocks.dart';

@GenerateNiceMocks([MockSpec<Dio>(), MockSpec<Connectivity>()])
void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  late ${controllerName} controller;
  late Connectivity mockConnectivity;
  late Dio mockDio;
  late MockDioService dioService;

  setUpAll(() {
    Get.testMode = true;

    mockDio = MockDio();
    dioService = MockDioService(mockDio);
    Get.put(mockDio, tag: 'congesClient');

    mockConnectivity = MockConnectivity();
    Get.put<Connectivity>(mockConnectivity);
    when(
      mockConnectivity.checkConnectivity(),
    ).thenAnswer((_) async => [ConnectivityResult.wifi]);

    controller = ${controllerName}();
  });

  group('tested_function_name', () {
    String queryRoute = '/v1/clients/open-days';

    setUp(() {
      // Reset all parameters between tests in this group
    });

    test('  (Nominal Case)', () async {
      final expectedData = [1, 2, 3, 4, 5];
      dioService.mockResponse(
        typeOfRequest: TypeOfRequest.get,
        route: queryRoute,
        result: {"data": expectedData},
      );
      final result = await controller.method();
      expect(result.fold((l) => null, (r) => r), expectedData);
    });
  });
}`;
}
