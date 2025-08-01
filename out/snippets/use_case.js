"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUseCaseFile = generateUseCaseFile;
function generateUseCaseFile(name, snake) {
    return `class ${name}UseCase {
  Repository repository;

  ${name}UseCase({required this.repository});

  bool ${snake}(Entity entity) {
    if (_can${name}(entity)) {
      return _${name}Call(entity);
    } else {
      return false;
    }
  }

  bool _can${name}(Entity entity) {
    throw UnimplementedError();
  }

  bool _${snake}Call(Entity entity) {
    throw UnimplementedError();
  }
}`;
}
//# sourceMappingURL=use_case.js.map