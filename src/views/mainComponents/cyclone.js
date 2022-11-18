import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { auth } from '../../firebase'
import db from '../../firebase1'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ResponsiveAppBar from './nav';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Cyclone_input() {
  const navigate = useNavigate()


  const [type, setType] = React.useState('');

  const handleChangeType = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      type: type,
      name: data.get('name'),
      location: data.get('location'),
      ocean: data.get('ocean'),
      peak_speed: Number(data.get('peak-speed')),
      loss: data.get('loss'),
      gdp_drop: data.get('gdp-drop'),
      damage: data.get('damage'),
      death: data.get('death'),
      date_formed: data.get('date-formed'),
      date_end: data.get('date-end'),
    });

    db.collection(type).doc(data.get('name')).set({
      name: data.get('name'),
      location: data.get('location'),
      ocean: data.get('ocean'),
      peak_speed: Number(data.get('peak-speed')),
      loss: Number(data.get('loss')),
      gdp_drop: Number(data.get('gdp-drop')),
      damage: Number(data.get('damage')),
      death: Number(data.get('death')),
      date_formed: data.get('date-formed'),
      date_end: data.get('date-end'),
    })
      .then(() => {
        alert("Cyclone added successfully");
      })
      .catch((error) => {
        alert("Error adding cyclone: ", error);
      });
    // auth
    //   .signInWithEmailAndPassword(data.get('email'), data.get('password'))
    //   .then((user) => {
    //     console.log(user)
    //     localStorage.setItem('is_log', 'true')
    //     console.log(localStorage.getItem('is_log'))
    //     navigate('/Dashboard')
    //     console.log('Log in successful')
    //   })
    //   .catch(function (err) {
    //     alert('Invalid Credentials')
    //   })
  };

  return (
    <>
      <ResponsiveAppBar />
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=452&q=80)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <AddCircleOutlinedIcon/>
              </Avatar>

              <Typography component="h1" variant="h5">
                Cyclone Data
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Cyclone Name"
                  type="text"
                  name="name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="location"
                  label="Location"
                  type="text"
                  id="location"
                  autoComplete="current-location"
                />
                <TextField
                  margin="normal"
                  required
                  halfWidth
                  name="ocean"
                  label="Ocean"
                  type="text"
                  id="ocean"
                  autoComplete="current-ocean"
                />
                <TextField
                  margin="normal"
                  required
                  halfWidth
                  name="peak-speed"
                  label="Peak-speed (kmph)"
                  type="decimal"
                  id="peak-speed"
                  autoComplete="current-peak-speed"
                />
                <TextField
                  margin="normal"
                  required
                  halfWidth
                  name="loss"
                  label="Monetory loss ($M)"
                  type="decimal"
                  id="loss"
                  autoComplete="current-loss"
                />
                <TextField
                  margin="normal"
                  required
                  halfWidth
                  name="gdp-drop"
                  label="GDP Drop (%)"
                  type="decimal"
                  id="gdp-drop"
                  autoComplete="current-gdp-drop"
                />
                <TextField
                  margin="normal"
                  required
                  halfWidth
                  name="damage"
                  label="Land Damage (Ha)"
                  type="number"
                  id="damage"
                  autoComplete="current-damage"
                />
                <TextField
                  margin="normal"
                  required
                  halfWidth
                  name="death"
                  label="Human Death"
                  type="number"
                  id="death"
                  autoComplete="current-death"
                />
                <TextField
                  margin="normal"
                  required
                  halfWidth
                  name="date-formed"
                  label="Cyclone Date Formed"
                  type="text"
                  id="date-formed"
                  autoComplete="current-date-formed"
                />
                <TextField
                  margin="normal"
                  required
                  halfWidth
                  name="date-end"
                  label="Cyclone Date Dissapated"
                  type="text"
                  id="date-end"
                  autoComplete="current-date-end"
                />
                <InputLabel id="demo-simple-select-label">Select INDIA/WORLD</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  fullWidth
                  value={type}
                  label="type"
                  onChange={handleChangeType}
                >
                  <MenuItem value={"INDIA"}>INDIA</MenuItem>
                  <MenuItem value={"WORLD"}>WORLD</MenuItem>
                </Select>
                {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Add Cyclone
                </Button>

                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}