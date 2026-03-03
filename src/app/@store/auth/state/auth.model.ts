
export interface AuthStoreStateModel {
    token? : string|null;
    isAuthenticated? : boolean;
    isLoading? : boolean;
    error? : string|null;
}

export interface AuthenticationRequest {
  username?: string | null | undefined;
  password?: string | null | undefined;
}
