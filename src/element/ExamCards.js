import React from 'react'
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
import { context } from '../context/Context';
import { questions } from '../question/question';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export function ExamCards({element}) {

    const {navigate} = useContext(context);

    function isSuccess(element){
        const compLocal = JSON.parse(localStorage.getItem("complate"));
        if (compLocal && compLocal.hasOwnProperty(element))
            return false;
        return true; 
    }

    function controlRouting(element){
        if (!localStorage.getItem("testName") || localStorage.getItem("testName") === JSON.stringify(element))
        {
            localStorage.setItem("testName", JSON.stringify(element));
            navigate("/ControlPage");
        }
    }

    function testRouting(element){
        let test = JSON.stringify(element);
        if (!localStorage.getItem("testName") || localStorage.getItem("testName") === test)
        {
            localStorage.setItem("testName", test);
            navigate("/QuizInterface");
        }
    }

    function testResetRouting(element){
        let test = JSON.stringify(element);
        if (!localStorage.getItem("testName") || localStorage.getItem("testName") === test)
        {
            localStorage.setItem("testName", test);
            navigate("/QuizInterface");
        }
        test = JSON.parse(test)
        if(test in JSON.parse(localStorage.getItem("complate")) && localStorage.getItem("testName") === JSON.stringify(test)){
            let compLocal = JSON.parse(localStorage.getItem("complate"));
            delete compLocal[test];
            delete compLocal[test+"Score"];
            localStorage.setItem("complate", JSON.stringify(compLocal));
        }
    }

  return (
    <Grid item xs={12} sm={6} md={4}>
        <Card
          sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

        <CardMedia
            component="div"
            sx={{
            pt: '56.25%',
            }}
            image="https://examonline.in/wp-content/uploads/2020/11/What-Is-Online-Exam.png"
        />

        <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
                {element}
            </Typography>
        </CardContent>

        <CardActions sx={{display:"flex",columnGap:"60%", alignItems:"center"}}>
            {isSuccess(element) && <Button onClick={() => testRouting(element)} size="small"><PlayArrowIcon fontSize="small" /> Solve</Button>}
            {(isSuccess(element) && JSON.parse(localStorage.getItem("testName")) === element)?  <HourglassEmptyIcon fontSize="small" /> :  ""}
            {(isSuccess(element) && JSON.parse(localStorage.getItem("testName")) !== element) ? <NewReleasesIcon fontSize="small" /> : ""}
            <div style={{display:"flex",columnGap:"25px", alignItems:"center"}}>
                {!isSuccess(element) && <Button onClick={() => testResetRouting(element)} size="small"><ReplayIcon fontSize="small" /> Again</Button> }
                {!isSuccess(element) && <Button  onClick={() => controlRouting(element)} size="small"><FormatListBulletedIcon size="small" /> control</Button> }
                {!isSuccess(element) && <div>{JSON.parse(JSON.parse(localStorage.getItem("complate"))[element + "Score"]) + "/" + Object.keys(questions[element]).length}</div>}
            </div>
        </CardActions>

        </Card>
    </Grid>
  )
}
