import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, Typography, TextField, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithData } from '../../store/auth/thunks';

const formData = { 
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener un @'],
  password: [ (value) => value.length >= 6, 'El password debe de tener más de seis caracteres'],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

  const { displayName, email, password, onInputChange, formState, isFormValid, displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations);
  
  const onSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;
    
    dispatch(startCreatingUserWithData(formState));
  }
  return (
    <AuthLayout title='Crear Cuenta'>
      <form onSubmit={onSubmit}>
          <Grid container>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label="Nombre Completo"
                type="text"
                placeholder='Tu Nombre'
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
              />
          </Grid>
          
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label="Correo"
                type="email"
                placeholder='correo@correo.com'
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted }
              helperText={emailValid}
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder='Tu contraseña'
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
              />
            </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            
            <Grid item
              xs={12}
              display={!!errorMessage ? '' : 'none'}
            >
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
            
              <Grid item xs={ 12 }>
              <Button
                disabled={isCheckingAuthentication}
                type='submit'
                variant='contained'
                fullWidth>
                  Crear Cuenta
                </Button>
              </Grid>
            </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes Cuenta?</Typography>
              <Link component={RouterLink} color='inherit' to='/auth/login'>
                Ingresar
              </Link>
            </Grid>

          </Grid>
      </form>
      
    </AuthLayout>
  )
}
