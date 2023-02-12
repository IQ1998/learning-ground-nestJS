export enum RoleCode {
  chief = 'CHIEF',
  staff = 'STAFF',
  admin = 'ADMIN',
  user = 'user',
}

export const RoleLevels = {
  [RoleCode.chief]: 2,
  [RoleCode.staff]: 1,
  [RoleCode.admin]: 3,
  [RoleCode.user]: 1,
};
