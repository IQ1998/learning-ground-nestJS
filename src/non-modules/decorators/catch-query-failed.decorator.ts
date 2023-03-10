import { HttpException } from '@nestjs/common';
import { FailedQueryException } from '../customExceptions/failed-query.exception';

export const catchFailedQuery = (currentFilePath) => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const actualFunction = descriptor.value;
    descriptor.value = async function (...args) {
      try {
        const result = await actualFunction.apply(this, args);
        return result;
      } catch (QueryFailedError) {
        console.log(
          '🚀 ~ file: catch-query-failed.decorator.ts:16 ~ QueryFailedError',
          QueryFailedError,
        );
        if (typeof QueryFailedError.query === 'string') {
          console.log(
            '🚀 ~ file: catch-query-failed.decorator.ts:24 ~ thrown here',
          );

          throw new FailedQueryException({
            code: QueryFailedError.code || 'SQL Error',
            query: QueryFailedError.query || '',
            message: QueryFailedError.message || '',
            failedAt: currentFilePath,
          });
        }
        throw QueryFailedError;
      }
    };
    return descriptor;
  };
};

// Only used for service querying using TypeORM
// THis function loop through a class methods
// and apply a try catch to catch TypeORM queryFailedError
// The error will be converted to TypeORM's HttpException
export const catchFailedQueryClass = (filePath) => {
  return function (target: any) {
    for (const propertyName of Object.getOwnPropertyNames(target.prototype)) {
      if (propertyName === 'constructor') continue;
      // Mutating the descriptor has no effect on the original object
      // SO that when finished, use Object.defineProperty
      const descriptor = Object.getOwnPropertyDescriptor(
        target.prototype,
        propertyName,
      );
      const isAsyncMethod =
        descriptor.value.constructor.name === 'AsyncFunction';
      if (!isAsyncMethod) continue;
      const originalMethod = descriptor.value;
      descriptor.value = async function (...args) {
        try {
          const result = await originalMethod.apply(this, args);
          return result;
        } catch (QueryFailedError) {
          if (typeof QueryFailedError.query === 'string') {
            throw new FailedQueryException({
              code: QueryFailedError.code || 'SQL Error',
              query: QueryFailedError.query || '',
              message: QueryFailedError.message || '',
              failedAt: `${filePath} -- ${propertyName}`,
            });
          }

          throw QueryFailedError;
        }
      };
      Object.defineProperty(target.prototype, propertyName, descriptor);
    }
    return target;
  };
};
