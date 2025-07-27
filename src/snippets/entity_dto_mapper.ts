export function generateEntityFile(className: string): string {
  return `// Entity CLASS
import 'package:faker/faker.dart';

// ****************************************
// After you created this snippet:
//
// - Remove unused attribute like 'final attributeXType attributeX;'
// - Implement Unimplemented methods or remove them if not needed
// - Use this command in the terminal to generate the missing file with freezed:
// ->>> dart run build_runner build --delete-conflicting-outputs
//
// When the files are generated, you can delete this comment
// ****************************************

// ****************************************
//  ${className} Entity
// ****************************************
class ${className} {
  final String attribute1;
  final String attribute2;
  final String attribute3;
  final String attribute4;
  final String attribute5;
  final String attribute6;
  final String attribute7;
  final String attribute8;
  final String attribute9;

  ${className}({
    required this.attribute1,
    required this.attribute2,
    required this.attribute3,
    required this.attribute4,
    required this.attribute5,
    required this.attribute6,
    required this.attribute7,
    required this.attribute8,
    required this.attribute9,
  })  : assert(attribute1Validator(attribute1) == null),
        assert(attribute2Validator(attribute2) == null);

  ${className} copyWith({
    String? attribute1,
    String? attribute2,
    String? attribute3,
    String? attribute4,
    String? attribute5,
    String? attribute6,
    String? attribute7,
    String? attribute8,
    String? attribute9,
  }) {
    return ${className}(
      attribute1: attribute1 ?? this.attribute1,
      attribute2: attribute2 ?? this.attribute2,
      attribute3: attribute3 ?? this.attribute3,
      attribute4: attribute4 ?? this.attribute4,
      attribute5: attribute5 ?? this.attribute5,
      attribute6: attribute6 ?? this.attribute6,
      attribute7: attribute7 ?? this.attribute7,
      attribute8: attribute8 ?? this.attribute8,
      attribute9: attribute9 ?? this.attribute9,
    );
  }

  factory ${className}.faker({int seed = 1}) {
    final faker = Faker.withGenerator(RandomGenerator(seed: seed));
    throw UnimplementedError(
      'Check other entities and generate fake values with relevant meaning',
    );
  }

  static String? attribute1Validator(String? attribute1) {
    throw UnimplementedError('Use generic validator to check your data');
  }

  static String? attribute2Validator(String? attribute2) {
    throw UnimplementedError('Use generic validator to check your data');
  }
}`;
}

export function generateDtoFile(className: string): string {
  return `// DTO CLASS
// ****************************************
//  ${className} DTO
// ****************************************
import 'package:freezed_annotation/freezed_annotation.dart';

part '\${TM_FILENAME_BASE}_dto.freezed.dart';
part '\${TM_FILENAME_BASE}_dto.g.dart';

@freezed
abstract class ${className}Dto with _\$${className}Dto {
  const factory ${className}Dto({
    @JsonKey(name: 'attribute1') String? attribute1,
    @JsonKey(name: 'attribute2') String? attribute2,
    @JsonKey(name: 'attribute3') String? attribute3,
    @JsonKey(name: 'attribute4') String? attribute4,
    @JsonKey(name: 'attribute5') String? attribute5,
    @JsonKey(name: 'attribute6') String? attribute6,
    @JsonKey(name: 'attribute7') String? attribute7,
    @JsonKey(name: 'attribute8') String? attribute8,
    @JsonKey(name: 'attribute9') String? attribute9,
  }) = _${className}Dto;

  factory ${className}Dto.fromJson(Map<String, dynamic> json) =>
      _\$${className}DtoFromJson(json);
}`;
}

export function generateMapperFile(className: string): string {
  return `// MAPPING CLASS
// ****************************************
//  ${className} MAPPER
// ****************************************
import 'package:auto_mappr_annotation/auto_mappr_annotation.dart';

@AutoMappr([
  MapType<${className}, ${className}Dto>(),
  MapType<${className}Dto, ${className}>(),
])
class ${className}Mapper extends ${className}Mapper {}`;
}

