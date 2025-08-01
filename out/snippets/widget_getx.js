"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWidgetGetxFile = generateWidgetGetxFile;
const utils_1 = require("../utils/utils");
function generateWidgetGetxFile(className, featureName) {
    const controllerClass = `${(0, utils_1.capitalize)(featureName)}Controller`;
    return `import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../../${featureName}_controller.dart';

class ${className}Widget extends StatelessWidget {
  ${className}Widget({super.key});

  final ${controllerClass} controller = Get.find<${controllerClass}>();

  @override
  Widget build(BuildContext context) {
    return Obx(() {
      return Container(
        padding: const EdgeInsets.all(16),
        child: Text(
          controller.toString(),
          style: Theme.of(context).textTheme.bodyLarge,
        ),
      );
    });
  }
}
`;
}
//# sourceMappingURL=widget_getx.js.map