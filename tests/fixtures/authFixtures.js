export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}
export const authenticatedState = {
    status: 'authenticated',
    uid: '123abc',
    email: 'test@correo.com',
    displayName: 'Demo User',
    photoURL: 'https://test.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const demoUser = {
    uid: '123abc',
    email: 'test@correo.com',
    displayName: 'Demo User',
    photoURL: 'https://test.jpg'
}