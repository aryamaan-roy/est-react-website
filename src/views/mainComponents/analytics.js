import * as React from 'react';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
// import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { CContainer } from '@coreui/react'
import { CButton, CCard, CCardBody, CCardHeader } from '@coreui/react'
import { height } from '@mui/system';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { string } from 'prop-types';
import TextField from '@mui/material/TextField';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UploadFile } from '@mui/icons-material';
import { useEffect } from 'react';
import { getStorage, ref, uploadBytes } from "firebase/storage";
// import LineChart from '@mui/charts/LineChart';
// import Line from '@mui/charts/Line';
// import XAxis from '@mui/charts/XAxis';
// import YAxis from '@mui/charts/YAxis';
// import Legend from '@mui/charts/Legend';
import CanvasJSReact from '../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import { collection, getDocs } from "firebase/firestore";
import db from '../../firebase1'




export default function Analytics() {

    const [line_data, setLinedata] = useState(
        {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            title: {
                text: "Cyclone v/s Peak Speed"
            },
            axisY: {
                title: "Peak Speed",
                suffix: "kmph"
            },
            axisX: {
                title: "Cyclone",
            },
            data: [
                {
                    // Change type to "doughnut", "line", "splineArea", etc.
                    type: "column",
                    dataPoints: [
                    ]
                }
            ]
        }
    )

    useEffect(() => {

        db.collection("INDIA").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                line_data.data[0].dataPoints.push({ label: doc.data()["Name"], y: doc.data()["Peak Speed"] });
            });
        });
        console.log(line_data.data[0].dataPoints);
    }, []);
    const [show_graph, setShow_graph] = useState(false);
    return (
        <>
            <div align="center">
                <button onClick={() => {
                    setShow_graph(!show_graph);
                    console.log(show_graph);
                }}>Show Graph</button>
                {show_graph ? <CanvasJSChart options={line_data} /> : null}
                <br></br>
            </div>
        </>
    );
}






