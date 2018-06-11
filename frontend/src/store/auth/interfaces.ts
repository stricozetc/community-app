export interface AuthState {
  isAuthenticated: boolean,
  user: FrontEndUser | undefined
}

export interface FrontEndUser {
  id: string, 
  name: string,
  email: string
}
