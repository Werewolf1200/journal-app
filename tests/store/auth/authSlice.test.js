import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('Pruebas en el AuthSlice', () => {

    test('Debe regresar el estado inicial y llamarse "auth"', () => {
        
        expect(authSlice.name).toBe('auth');

        const state = authSlice.reducer(initialState, {});
        
        expect(state).toEqual(initialState);
    });

    test('Debe realizar la autenticación', () => {
        
        const state = authSlice.reducer(initialState, login(demoUser));
        
        expect(state).toEqual({
            status: 'authenticated',
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null
        });
    });

    test('Debe realizar el logout sin argumentos', () => {
        
        const state = authSlice.reducer(authenticatedState, logout());
        
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        });
    });

    test('Debe realizar el logout y mostrar un mensaje de error', () => {

        const errorMessage = 'Credenciales Incorrectas';
        
        const state = authSlice.reducer(authenticatedState, logout({errorMessage}));
        
        expect(state).toEqual({
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
    });

    test('Debe de cambiar el estado a checking', () => {

        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        
        expect(state.status).toBe('checking')
        
    });
});