import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useContext, useEffect} from 'react';
import { context } from '../context/Context';
import { questions } from '../question/question';

export function ControlPage() {

    const {setquesIndex, quesIndex, score, setScore, navigate} = useContext(context);
    const arr = questions[JSON.parse(localStorage.getItem("testName"))];

    useEffect(() => {
        let newValue = JSON.parse(localStorage.getItem("quesIndex")) || 0;
        setquesIndex(newValue);
    }, [])

    function ButtonCreation(){
        let inner = [];
        for(let i = 0; i < 4; i++){
            let styleGroup = {}
            const storedObject = JSON.parse(localStorage.getItem("complate"))[JSON.parse(localStorage.getItem("testName"))];
            if (storedObject[quesIndex].toUpperCase() === arr[quesIndex].answerOptions[i].answerText.toUpperCase())
                styleGroup.backgroundColor = "red";
            if (arr[quesIndex].answerOptions[i].answerText.toUpperCase() === questions[JSON.parse(localStorage.getItem("testName"))][quesIndex].isCorrect.toUpperCase())
                styleGroup.backgroundColor = "green";
            inner.push(<Button key={i} sx={{width:"100%", ...styleGroup}} disabled variant="outlined">{arr[quesIndex].answerOptions[i].answerText}</Button>);
        }

        return inner;
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

        {arr && quesIndex < arr.length ?
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
                    <ButtonCreation />
            </Stack>
        </>
        : 
        <div style={{display:"flex",justifyContent:"center",alignItems:'center',flexDirection:"column"}}>
            {localStorage.removeItem("testName")}
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
                You checked all your questions ✅
            </Typography>
            <Button sx={{width:"15%"}} variant="outlined" onClick={() => navigate("/Exams")} >Home</Button>
        </div>
        }
    </Box>
    <Button sx={{width:"15%"}} variant="outlined" onClick={() => setquesIndex(quesIndex + 1)} >Next</Button>
</div>
  )
}
