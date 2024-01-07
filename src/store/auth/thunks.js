import { loginWithData, logoutFirebase, registerUserWithData, singInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());

        const result = await singInWithGoogle();
        
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
}

export const startCreatingUserWithData = ({ email, password, displayName }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await registerUserWithData({ email, password, displayName });
        
        if (!result.ok) return dispatch(logout(result))
        
        dispatch(login(result));
    }
}

export const startLoginWithData = ({ email, password }) => {
    return async (dispatch) => {
        
        dispatch(checkingCredentials());

        const result = await loginWithData({ email, password });

        if (!result.ok) return dispatch(logout( result ))
        dispatch(login(result));
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();

        dispatch(clearNotesLogout());
        dispatch(logout());
    }
}