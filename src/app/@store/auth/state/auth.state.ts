import { Injectable } from "@angular/core";
import { Action, Actions, Selector, State, StateContext, } from "@ngxs/store";
import { AuthStoreStateModel } from "./auth.model";

import { LoginAction } from "./auth.action";
import { EMPTY, Observable, switchMap, catchError, finalize, tap} from "rxjs";
import { AuthService } from "../service/auth.service";


@State<AuthStoreStateModel>({
    name: 'AUTH',
    defaults: {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null
    }
})

@Injectable()
export class AuthState {
    constructor(
        private authService: AuthService
    ){}

    @Selector()
    static isAuthenicater(state: AuthStoreStateModel): boolean | undefined {
        return state?.isAuthenticated
    }

    @Selector()
    static isLoading(state: AuthStoreStateModel): boolean | undefined {
        return state?.isLoading
    }

    @Action(LoginAction)
    loginRequest(
        ctx: StateContext<AuthStoreStateModel>, 
        action: LoginAction
    ):  Observable<void> {
        ctx.patchState({
            isLoading: true,
            error: null
        });
        return this.authService.login(action.payload)
            .pipe(
                // switchMap((response:any) => {
                //     const token = response.jwt_token;
                //     localStorage.setItem('token', token)
                //     ctx.patchState({
                //         token: token,
                //         isAuthenticated: true
                //     })
                //     return EMPTY
                // }), 
                tap((response: any) => {
                    const token = response.jwt_token;
                    localStorage.setItem('token', token);

                    ctx.patchState({
                    token,
                    isAuthenticated: true
                    });
                }),
                catchError((error) => {
                    ctx.patchState({
                        error : 'Invalid username or password'
                    })
                    return EMPTY
                }), 
                finalize(() => {
                    ctx.patchState({
                        isLoading: false
                    })
                })

            )
    }




}

