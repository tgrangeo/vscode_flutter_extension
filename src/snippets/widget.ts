export function generateStatefulWidget(widgetName: string): string {
    return `import 'package:flutter/material.dart';

class ${widgetName} extends StatefulWidget {
  const ${widgetName}({super.key});

  @override
  State<${widgetName}> createState() => _${widgetName}State();
}

class _${widgetName}State extends State<${widgetName}> {
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
`;
}
