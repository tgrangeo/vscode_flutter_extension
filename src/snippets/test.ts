export function generateWidgetTest(widgetName: string): string {
  const fileName = widgetName.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();

    return `import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:extension_test/view/other/${fileName}.dart';

void main() {
  testWidgets('${widgetName} has Placeholder', (WidgetTester tester) async {
    await tester.pumpWidget(const MaterialApp(home: ${widgetName}()));
    expect(find.byType(Placeholder), findsOneWidget);
  });
}
`;
}
