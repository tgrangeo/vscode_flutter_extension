import { packageName } from "../utils/settings";

export function generateNavigationEntry(
  className: string,
  classNameLower: string
): string {

  return `// ****************************************
  //          NAVIGATION SET-UP
  // ****************************************
  // Add this to navigation folder/file/Service
  String ${classNameLower} = '/${classNameLower}';
  
  GetPage(
    title: '${classNameLower}',
    name: ${classNameLower},
    page: () => const ${className}View(),
    binding: ${className}Bindings(),
  ),`;
}

export function generateBindingsFile(className: string): string {
  const name: string = packageName()
  return `// ****************************************
//             BINDING FILE
// ****************************************
// Change repository with a dependencie if you have one.
import 'package:${name}/core/service/navigation_service.dart';
import 'package:get/get.dart';

class ${className}Bindings extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut(
      () => ${className}Controller(
        repository: Repository(),
      ),
    );
  }
}`;
}

export function generateControllerFile(className: string): string {
  return `// ****************************************
//             CONTROLLER FILE
// ****************************************
import 'package:sentry_flutter/sentry_flutter.dart';
import 'package:get/get.dart';

class ${className}Controller extends GetxController with StateMixin {
  final Repository repository;

  ${className}Controller({
    required this.repository,
  });

  @override
  void onInit() {
    super.onInit();
    change(null, status: RxStatus.loading());

    try {
      (isDataEmpty)
          ? change(null, status: RxStatus.empty())
          : change(null, status: RxStatus.success());
    } catch (exception, stackTrace) {
      Sentry.captureException(exception, stackTrace: stackTrace);
      change(null, status: RxStatus.error());
    }
  }
}`;
}

export function generateViewFile(className: string): string {
  const name: string = packageName()
  return `// ****************************************
//                VIEW FILE
// ****************************************
import 'package:${name}/view/common/empty_page.dart';
import 'package:${name}/view/common/error_page.dart';
import 'package:skeletonizer/skeletonizer.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ${className}View extends GetView<${className}Controller> {
  const ${className}View({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: controller.obx(
          (state) => buildView(context),
          onEmpty: _emptyView(context),
          onLoading: _loadingView(context),
          onError: (error) => _errorView(context),
        ),
      ),
    );
  }

  Widget buildView(BuildContext context) {
    throw UnimplementedError('TODO: displayed when everything is fine and we have the data.');
  }

  Widget _emptyView(BuildContext context) {
    return EmptyPage();
  }

  Widget _loadingView(BuildContext context) {
    return Skeletonizer(enabled: true, child: buildView(context));
  }

  Widget _errorView(BuildContext context) {
    return ErrorPage(onPressed: () => controller.onInit());
  }
}`;
}
