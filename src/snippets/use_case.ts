export function generateUseCaseFile(name: string, snake:String): string {
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