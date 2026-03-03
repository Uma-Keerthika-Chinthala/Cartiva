
import { AuthenticationRequest } from "./auth.model";

enum AuthActions {

    //login
    LOGIN = '[Auth] Login',

    //logout
    LOGOUT = '[Auth] Logout',

    //login success
    LOGIN_SUCCESS = '[Auth] Login Success',

    //login failure
    LOGIN_FAILURE = '[Auth] Login Failure',

    //check authentication
    CHECK_AUTHENTICATION = '[Auth] Check Authentication'

}


// login Action
export class LoginAction {
    static readonly type : AuthActions = AuthActions.LOGIN;
    constructor(public payload: AuthenticationRequest) {}
}

export class LoginSuccess {
  static readonly type : AuthActions = AuthActions.LOGIN_SUCCESS;
  constructor(public token: string) {}
}

export class LoginFailure {
  static readonly type = AuthActions.LOGIN_FAILURE;
  constructor(public error: string) {}
}

export class Logout {
  static readonly type = AuthActions.LOGOUT;
}

export class CheckAuthentication {
  static readonly type = AuthActions.CHECK_AUTHENTICATION;
}

