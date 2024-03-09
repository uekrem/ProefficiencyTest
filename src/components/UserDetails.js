import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from "yup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import {MultipleSelectCheckmarks} from "../element/MultiElement.js";
import { context } from '../context/Context.js';
import { useContext } from 'react';

const defaultTheme = createTheme();

export default function SignIn() {
  
  localStorage.removeItem("name")
  const {email, password} = JSON.parse(localStorage.getItem("user"));
  const {setGender, setDepartment, navigate} = useContext(context);

  const formik = useFormik({
    initialValues: {
      name:"",
      department:"",
    },
    validationSchema:
      Yup.object({
        name: Yup
          .string('Enter your name')
          .required('Name is required'),
        department: Yup
          .string('Enter your department')
          .required('Department is required'),
      }),
      onSubmit: (values) => {
        setDepartment(values.department);
        localStorage.setItem("name", JSON.stringify(values.name));
        navigate("/Exams");
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

          <Typography component="h1" variant="h5">
            Register In
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              disabled={true}
              value={email}
            />

            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup defaultValue="male" row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
              <FormControlLabel onClick={() => setGender("Male")} value="male" control={<Radio />} label="Male" />
              <FormControlLabel onClick={() => setGender("Female")} value="female" control={<Radio />} label="Female" />
            </RadioGroup>

            <TextField
              margin="normal"
              fullWidth
              id="department"
              label="Department"
              name="department"
              autoFocus
              value={formik.values.department}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.department && Boolean(formik.errors.department)}
              helperText={formik.touched.department && formik.errors.department}
            />

            <MultipleSelectCheckmarks />

            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              disabled={true}
              value={password}
            />

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              disabled={!formik.dirty || Boolean(formik.errors.name) || Boolean(formik.errors.department)}
              sx={{ mt: 3, mb: 2 }}
            >
              Saved
            </Button>

          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}