import { capitalize } from "../utils/utils";

export function generateWidgetGetxFile(className: string, featureName: string): string {
    const controllerClass = `${capitalize(featureName)}Controller`;

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