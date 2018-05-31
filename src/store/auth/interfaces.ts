export interface AuthState {
  isAuthenticated: boolean,
  user: FrontEndUser | {}
}

export interface FrontEndUser {
  id: string, 
  name: string,
  email: string
}
