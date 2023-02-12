import { RoleLevels, RoleCode } from '../../role/role.constant';

export default function roleCompare(thisRole: RoleCode, theOther: RoleCode) {
  return RoleLevels[thisRole] - RoleLevels[theOther] >= 0;
}
