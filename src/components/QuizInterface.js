import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { questions } from "../question/question";
import { useContext } from 'react';
import { context } from '../context/Context';

export default function QuizInterface() {

    const {setquesIndex, quesIndex, score, setScore, navigate} = useContext(context);
    const arr = questions[JSON.parse(localStorage.getItem("testName"))]; 

    useEffect(() => {
        let newValue = JSON.parse(localStorage.getItem("quesIndex")) || 0;
        setquesIndex(newValue);
    }, [])

    function complate(){
        const complate = {};
        const complateObj = JSON.parse(localStorage.getItem("complate")) || complate;
        if(complateObj[JSON.parse(localStorage.getItem("testName"))])
            delete complateObj[JSON.parse(localStorage.getItem("testName"))];
        complateObj[JSON.parse(localStorage.getItem("testName"))] = JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem("testName"))));
        complateObj[JSON.parse(localStorage.getItem("testName")) + "Score"] = score;
        localStorage.setItem("complate", JSON.stringify(complateObj));
    }

    function optionEvaluation(e){
        if (arr[quesIndex].isCorrect.toUpperCase() === e.target.innerText.toUpperCase())
            setScore(score + 1);
        setquesIndex(quesIndex + 1);
        const storedObject = JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem("testName")))) || {};
        storedObject[quesIndex] = e.target.innerText;
        localStorage.setItem(JSON.parse(localStorage.getItem("testName")), JSON.stringify(storedObject));
        localStorage.setItem("quesIndex", quesIndex + 1)
    }

  return (
    <div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:'center',flexDirection:"column",rowGap:20}}>
        <Box sx={{
                width:"55%",
                height:"50%",
                display:"flex",
                flexDirection:"row",
                justifyContent:"center",
                columnGap:"5%",
                alignItems:'center',
                bgcolor:"aqua",
                borderRadius: 2,
                padding:"0 3%",
                background: "url('https://images.ctfassets.net/co0pvta7hzrh/4HXgYTXpCBovpU5iTaaXJM/6aa829241a2851d38fc53cb7c73e49e3/PictureQuizThumb.png') center/cover no-repeat",
            }}>

            {arr && quesIndex !== arr.length ?
            <>
                <CardContent sx={{
                    width:"65%",
                    height:"60%",
                    backdropFilter: "blur(4px)",
                    overflow:"auto",
                    wordWrap:"break-word",
                    borderRadius: 2,
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center"}}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Question {quesIndex + 1}/{arr.length}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {arr[quesIndex].questionText}
                    </Typography>
                </CardContent>

                <Stack sx={{width:"35%",height:"50%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:'center'}} spacing={3}>
                    <Button sx={{width:"100%"}} variant="outlined" onClick={optionEvaluation} >{arr[quesIndex].answerOptions[0].answerText}</Button>
                    <Button sx={{width:"100%"}} variant="outlined" onClick={optionEvaluation} >{arr[quesIndex].answerOptions[1].answerText}</Button>
                    <Button sx={{width:"100%"}} variant="outlined" onClick={optionEvaluation} >{arr[quesIndex].answerOptions[2].answerText}</Button>
                    <Button sx={{width:"100%"}} variant="outlined" onClick={optionEvaluation} >{arr[quesIndex].answerOptions[3].answerText}</Button>
                </Stack>
            </>
            : 
            <div>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Your answers have been successfully recorded ✅
                </Typography>
                {complate()}
                {localStorage.removeItem(JSON.parse(localStorage.getItem("testName")))}
                {localStorage.removeItem("testName")}
                {localStorage.removeItem("quesIndex")}
            </div>
            }
        </Box>
        <Button sx={{width:"15%"}} variant="outlined" onClick={() => navigate("/Exams")} >Home</Button>
    </div>
  )
}
