import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm'
import { useEffect, useMemo } from 'react';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startSaveNote } from '../../store/journal/thunks';

export const NoteView = () => {

    const dispatch = useDispatch();

    const { active: note } = useSelector(state => state.journal);

    const { body, title, date, onInputChange, formState } = useForm(note);

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date]);

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState])

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }
    

  return (
      <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
          
          <Grid item>
              <Typography fontSize={39} fontWeight='light'>{ dateString }</Typography>
          </Grid>
          <Grid item>
              <Button
                  onClick={ onSaveNote }
                  color='primary'
                  sx={{ padding: 2 }}>
                  <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                  Guardar
              </Button>
          </Grid>

          <Grid container>
              <TextField
                  type='text'
                  variant='filled'
                  fullWidth
                  placeholder='Ingresa un Titulo'
                  label='Titulo'
                  sx={{ border: 'none', mb: 1 }}
                  name='title'
                  value={title}
                  onChange={onInputChange}
              />
              <TextField
                  type='text'
                  variant='filled'
                  fullWidth
                  multiline
                  placeholder='¿Qué sucedió el día de hoy?'
                  minRows={5}
                  name='body'
                  value={body}
                  onChange={onInputChange}
              />
          </Grid>

          <ImageGallery />
          
    </Grid>
  )
}
