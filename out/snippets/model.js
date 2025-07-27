"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateModel = generateModel;
function generateModel(widgetName) {
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
//# sourceMappingURL=model.js.map