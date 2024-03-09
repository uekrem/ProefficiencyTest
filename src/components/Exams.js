import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useEffect } from 'react';
import { context } from '../context/Context';
import { questions } from '../question/question';
import { ExamCards } from '../element/ExamCards';
import Alert from '@mui/material/Alert';

const defaultTheme = createTheme();

export function Exams() {

    const {setScore, setquesIndex, navigate} = useContext(context);

    useEffect(() => {
      setScore(0);
      setquesIndex(0);
    }, [])

    function userExit(){
      localStorage.removeItem("name")
      localStorage.removeItem("user")
      localStorage.removeItem("complate")
      navigate("/");
    }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar sx={{backgroundColor:"white", position:"relative"}}>
        <Toolbar>
            <Button variant="outlined" onClick={userExit} sx={{ mt: 3, mb: 3, position:"absolute", right:"1%"}}>
                Log-Out
            </Button>
        </Toolbar>
      </AppBar>

      <main>

        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome <br /> {JSON.parse(localStorage.getItem("name"))}
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Are you ready to take the exam?
            </Typography>
            {
              JSON.parse(localStorage.getItem("testName")) 
              && 
              <Alert variant="filled" fullwidth severity="error">
                You cannot move on to other tests without completing the {JSON.parse(localStorage.getItem("testName"))} test.
              </Alert>
            }
          </Container>
        </Box>

        <Container maxWidth="md">
          <Grid container spacing={4}>
            {Object.keys(questions).map((elementT) => (
              <ExamCards key={elementT} element={elementT} />
            ))}
          </Grid>
        </Container>

      </main>
    </ThemeProvider>
  );
}