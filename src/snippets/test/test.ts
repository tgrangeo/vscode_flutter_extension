export function generateTestFile(className: string): string {
  const camel = className.charAt(0).toLowerCase() + className.slice(1);

  return `import 'package:flutter_test/flutter_test.dart';

void main() {
  group('${camel}', () {
    test('should perform ${camel} use case', () {
      // TODO: implement test
      throw UnimplementedError('test not implemented');
    });
  });
}`;
}