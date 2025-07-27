"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFakeRepositorySingleton = generateFakeRepositorySingleton;
function generateFakeRepositorySingleton(widgetName, classNameWithoutMaj) {
    return `import 'package:yotta_city/data/dto/${classNameWithoutMaj}_dto/${classNameWithoutMaj}_dto.dart';
import 'package:yotta_city/domain/${classNameWithoutMaj}/mapper/${classNameWithoutMaj}_mapper.dart';
import 'package:yotta_city/domain/${classNameWithoutMaj}/${classNameWithoutMaj}.dart';

class ${widgetName}Repository {
  ${widgetName}Repository._internal() {
    _fakeDatabase = List.generate(
      5,
      (index) => ${widgetName}Mapper().convert(${widgetName}.faker(seed: index)),
    );
  }

  static final ${widgetName}Repository _singleton = ${widgetName}Repository._internal();

  factory ${widgetName}Repository() {
    return _singleton;
  }

  int _count = 0;
  String get _uniqueId => "${widgetName}_\$_count";
  late final List<${widgetName}Dto> _fakeDatabase;

  ${widgetName} add${widgetName}(${widgetName} ${classNameWithoutMaj}) {
    _count++;
    _fakeDatabase.add(${widgetName}Mapper().convert(${classNameWithoutMaj}.copyWith(id: _uniqueId)));
    return ${classNameWithoutMaj};
  }

  bool update${widgetName}(${widgetName} ${classNameWithoutMaj}) {
    final index = _fakeDatabase.indexWhere((dto) => dto.id == ${classNameWithoutMaj}.id);
    bool is${widgetName}InDatabase() => index != -1;

    if (is${widgetName}InDatabase()) {
      final ${widgetName}Dto updated${widgetName} = ${widgetName}Mapper().convert(${classNameWithoutMaj});
      _fakeDatabase[index] = updated${widgetName};
      return true;
    } else {
      return false;
    }
  }

  bool remove${widgetName}(${widgetName} ${classNameWithoutMaj}) {
    if (_fakeDatabase.any((${classNameWithoutMaj}Dto) => ${classNameWithoutMaj}Dto.id == ${classNameWithoutMaj}.id)) {
      return _fakeDatabase.remove(
        _fakeDatabase.firstWhere(
          (reservationDto) => reservationDto.id == ${classNameWithoutMaj}.id,
        ),
      );
    } else {
      return false;
    }
  }

  ${widgetName}? get${widgetName}ById(String ${classNameWithoutMaj}Id) {
    if (_fakeDatabase.any((${classNameWithoutMaj}) => ${classNameWithoutMaj}.id == ${classNameWithoutMaj}Id)) {
      return ${widgetName}Mapper().convert(
        _fakeDatabase.firstWhere((${classNameWithoutMaj}) => ${classNameWithoutMaj}.id == ${classNameWithoutMaj}Id),
      );
    }
    return null;
  }

  List<${widgetName}> _get${widgetName}ListWhere({
    required bool Function(${widgetName}) filter,
    int pageNumber = 1,
    int quantityPerPage = 10,
  }) {
    var filteredResult =
        _fakeDatabase
            .map((dto) => ${widgetName}Mapper().convert<${widgetName}Dto, ${widgetName}>(dto))
            .where(filter)
            .toList();

    int pageStartIndex = (pageNumber - 1) * quantityPerPage;
    int pageEndIndex = pageStartIndex + quantityPerPage;

    if (pageStartIndex >= filteredResult.length) {
      return [];
    }

    return filteredResult.sublist(
      pageStartIndex,
      pageEndIndex.clamp(0, filteredResult.length),
    );
  }

  List<${widgetName}> get${widgetName}List({
    bool Function(${widgetName})? filter,
    int pageNumber = 1,
    int quantityPerPage = 10,
  }) {
    return _get${widgetName}ListWhere(
      pageNumber: pageNumber,
      quantityPerPage: quantityPerPage,
      filter: filter ?? (${classNameWithoutMaj}) => true,
    );
  }
}`;
}
//# sourceMappingURL=fake_repository_singleton.js.map