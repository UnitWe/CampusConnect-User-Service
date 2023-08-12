//@ts-nocheck

import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@ValidatorConstraint({ async: true })
export class RecordAlreadyExistsValidator implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const [ model, property ] = args.constraints;
    const record = await prisma[model].count({ where: { [property]: value } });
    
    return record <= 0;
  }

  defaultMessage(): string {
    return 'Record already exists in the database';
  }
}

export function RecordAlreadyExists(model: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string): void {
    registerDecorator({
      name: 'recordAlreadyExists',
      target: object.constructor,
      constraints: [model, propertyName],
      propertyName: propertyName,
      options: validationOptions,
      validator: RecordAlreadyExistsValidator,
    });
  };
}