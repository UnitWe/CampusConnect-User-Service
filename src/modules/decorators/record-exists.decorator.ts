//@ts-nocheck

import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@ValidatorConstraint({ async: true })
export class RecordExistsValidator implements ValidatorConstraintInterface {
    async validate(value: any, args: ValidationArguments): Promise<boolean> {
        const [model, property] = args.constraints;
        
        const record = await prisma[model].count({ where: { [property]: value } });

        return !(record <= 0);
    }

    defaultMessage(): string {
        return 'Record doesnt exists in the database or its invalid';
    }
}

export function RecordExists(options: { model: string, propertyName?: string }, validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string): void {
        registerDecorator({
            name: 'recordExists',
            target: object.constructor,
            constraints: [options.model, options.propertyName ? options.propertyName : propertyName],
            propertyName: propertyName,
            options: validationOptions,
            validator: RecordExistsValidator,
        });
    };
}