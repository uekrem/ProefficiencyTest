import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { context } from '../context/Context';

const defaultTheme = createTheme();

export default function SignIn() {

  const {navigate} = React.useContext(context)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema:
      Yup.object({
        email: Yup
          .string('Enter your email')
          .email('Enter a valid email')
          .required('Email is required'),
        password: Yup
          .string('Enter your password')
          .min(8, 'Password should be of minimum 8 characters length')
          .required('Password is required'),
      }),
    onSubmit: (values) => {
      localStorage.setItem('user', JSON.stringify({email:values.email, password:values.password}));
      localStorage.setItem('name', "none");
      navigate("/UserDetails");
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            height: "100vh",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:"center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Details
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              disabled={!formik.dirty || Boolean(formik.errors.password) || Boolean(formik.errors.email)}
              sx={{ mt: 3, mb: 2 }}
            >
              Register In
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}