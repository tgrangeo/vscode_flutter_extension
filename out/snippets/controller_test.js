"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateViewControllerTest = generateViewControllerTest;
function generateViewControllerTest(controllerName, dependencyName) {
    return `import 'package:dartz/dartz.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

import '\${TM_FILENAME_BASE}.mocks.dart';

@GenerateNiceMocks([MockSpec<${dependencyName}>()])
void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  late ${controllerName} controller;

  late ${dependencyName} mock${dependencyName};

  setUpAll(() {
    Get.testMode = true;
    mock${dependencyName} = Mock${dependencyName}();

    controller = ${controllerName}(dependencie: mock${dependencyName});
  });

  group('tested_function_name', () {
    setUp(() {
      // Reset all parameters between tests in this group
    });

    test('  (Nominal Case)', () async {});
  });
}`;
}
//# sourceMappingURL=controller_test.js.map