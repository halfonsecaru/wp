import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

export interface SwaggerDecoratorOptions {
  summary: string;
  description?: string;
  successDescription?: string;
  errorDescription?: string;
  notFoundDescription?: string;
  badRequestDescription?: string;
  params?: Array<{
    name: string;
    description: string;
    type?: string;
    required?: boolean;
  }>;
  queries?: Array<{
    name: string;
    description: string;
    type?: string;
    required?: boolean;
  }>;
}

/**
 * Decorador personalizado que combina @ApiOperation y @ApiResponse
 * para mantener el código más limpio en los controladores
 */
export function SwaggerDecor(options: SwaggerDecoratorOptions) {
  const decorators = [
    ApiOperation({
      summary: options.summary,
      description: options.description || options.summary,
    }),
    ApiResponse({
      status: 200,
      description: options.successDescription || 'Operación exitosa',
    }),
    ApiResponse({
      status: 400,
      description: options.badRequestDescription || 'Solicitud incorrecta',
    }),
    ApiResponse({
      status: 401,
      description: 'No autorizado',
    }),
    ApiResponse({
      status: 403,
      description: 'Acceso prohibido',
    }),
    ApiResponse({
      status: 500,
      description: options.errorDescription || 'Error interno del servidor',
    }),
  ];

  // Agregar ApiParam si se especifican parámetros
  if (options.params) {
    options.params.forEach(param => {
      decorators.push(
        ApiParam({
          name: param.name,
          description: param.description,
          type: param.type || 'string',
          required: param.required !== false,
        })
      );
    });
  }

  // Agregar ApiQuery si se especifican queries
  if (options.queries) {
    options.queries.forEach(query => {
      decorators.push(
        ApiQuery({
          name: query.name,
          description: query.description,
          type: query.type || 'string',
          required: query.required !== false,
        })
      );
    });
  }

  return applyDecorators(...decorators);
}

/**
 * Decorador específico para operaciones CRUD comunes
 */
export class SwaggerCrud {
  static Create(entityName: string) {
    return SwaggerDecor({
      summary: `Crear ${entityName}`,
      description: `Crea un nuevo registro de ${entityName}`,
      successDescription: `${entityName} creado exitosamente`,
      badRequestDescription: 'Datos de entrada inválidos',
    });
  }

  static FindAll(entityName: string) {
    return SwaggerDecor({
      summary: `Listar ${entityName}s`,
      description: `Obtiene todos los registros de ${entityName}`,
      successDescription: `Lista de ${entityName}s obtenida exitosamente`,
    });
  }

  static FindOne(entityName: string) {
    return SwaggerDecor({
      summary: `Obtener ${entityName}`,
      description: `Obtiene un registro específico de ${entityName} por ID`,
      successDescription: `${entityName} obtenido exitosamente`,
      notFoundDescription: `${entityName} no encontrado`,
      params: [{
        name: 'id',
        description: `ID del ${entityName}`,
        type: 'number',
      }],
    });
  }

  static Update(entityName: string) {
    return SwaggerDecor({
      summary: `Actualizar ${entityName}`,
      description: `Actualiza un registro existente de ${entityName}`,
      successDescription: `${entityName} actualizado exitosamente`,
      notFoundDescription: `${entityName} no encontrado`,
      badRequestDescription: 'Datos de entrada inválidos',
      params: [{
        name: 'id',
        description: `ID del ${entityName}`,
        type: 'number',
      }],
    });
  }

  static Remove(entityName: string) {
    return SwaggerDecor({
      summary: `Eliminar ${entityName}`,
      description: `Elimina un registro de ${entityName}`,
      successDescription: `${entityName} eliminado exitosamente`,
      notFoundDescription: `${entityName} no encontrado`,
      params: [{
        name: 'id',
        description: `ID del ${entityName}`,
        type: 'number',
      }],
    });
  }

  static GetCount(entityName: string) {
    return SwaggerDecor({
      summary: `Contar ${entityName}s`,
      description: `Obtiene el total de registros de ${entityName}`,
      successDescription: `Conteo de ${entityName}s obtenido exitosamente`,
    });
  }

  static FindAllCreatedOrUpdated(entityName: string) {
    return SwaggerDecor({
      summary: `Buscar ${entityName}s por criterios`,
      description: `Busca registros de ${entityName} creados o actualizados según criterios específicos`,
      successDescription: `${entityName}s encontrados exitosamente`,
      queries: [
        {
          name: 'startDate',
          description: 'Fecha de inicio para la búsqueda',
          type: 'string',
          required: false,
        },
        {
          name: 'endDate',
          description: 'Fecha de fin para la búsqueda',
          type: 'string',
          required: false,
        },
      ],
    });
  }
}