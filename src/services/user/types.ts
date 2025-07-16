export interface CreateUserDto {
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
