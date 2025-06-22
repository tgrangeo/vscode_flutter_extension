export function generateModel(widgetName: string): string {
  return `class ${widgetName}Model {
  ${widgetName}Model();

  factory ${widgetName}Model.fromJson(Map<String, dynamic> json) {
    return ${widgetName}Model();
  }

  Map<String, dynamic> toJson() {
    return {};
  }
}
`;
}