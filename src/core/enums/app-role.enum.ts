export enum Role {
	ADMIN = 'Admin'
}

export class RoleGroup {
	static readonly ALL_ROLES: Role[] = [Role.ADMIN];
}
