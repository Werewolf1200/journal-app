import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../../src/store/auth/authSlice";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { notAuthenticatedState } from "../../fixtures/authFixtures";
import { startGoogleSignIn, startLoginWithData } from "../../../src/store/auth/thunks";
import { Password } from "@mui/icons-material";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithData = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithData: ({ email, password }) => {
        return () => mockStartLoginWithData({ email, password });
    }
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
}));



const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});


describe('Pruebas en LoginPage', () => {

    beforeEach(() => jest.clearAllMocks());

    test('Debe mostrar el componente correctamente', () => {
        
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });

    test('Boton de Google debe llamar onGoogleSignIn', () => {
        
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click(googleBtn);

        expect(mockStartGoogleSignIn).toHaveBeenCalled();

    });

    test('Submit debe llamar startLoginWithData', () => {

        const email = 'corre@test.com';
        const password = '123456';
        
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change(emailField, { target: { name: 'email', value: email } });

        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit(loginForm);

        expect(mockStartLoginWithData).toHaveBeenCalledWith({
            email: email,
            password: password
        })

    });
});