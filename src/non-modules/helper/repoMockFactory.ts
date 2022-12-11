import { Repository } from 'typeorm';

export type MockType<T> = {
  // [P in keyof T]?: jest.Mock<T[P]>;
  [P in keyof T]?: jest.Mock<Record<string, unknown>>;
};

export const repositoryMockFactory: (
  functionsThatNeedMocking: string[],
) => () => MockType<Repository<any>> = (functionsThatNeedMocking: string[]) =>
  jest.fn(() => {
    return functionsThatNeedMocking.reduce((prev, curr) => {
      return {
        ...prev,
        [curr]: jest.fn((entity) => entity),
      };
    }, {});
  });

// export const repositoryMockFactory: (
//   functionsThatNeedMocking: string[],
// ) => MockType<Repository<any>> = (functionsThatNeedMocking: string[]) => {
//   return functionsThatNeedMocking.reduce((prev, curr) => {
//     return {
//       ...prev,
//       [curr]: jest.fn((entity) => entity),
//     };
//   }, {});
// };

// I want to mock
