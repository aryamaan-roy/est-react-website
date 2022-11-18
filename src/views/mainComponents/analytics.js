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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Analytics() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [cyclone_vs_peak_speed_world, setLine1data] = useState(
        {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            title: {
                text: "Cyclone v/s Peak Speed WORLD"
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
    const [cyclone_vs_peak_speed_india, setLine5data] = useState(
        {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            title: {
                text: "Cyclone v/s Peak Speed INDIA"
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

    const [cyclone_vs_death_world, setLine3data] = useState(
        {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            title: {
                text: "Cyclone v/s Human Death WORLD"
            },
            axisY: {
                title: "Human Deaths",
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

    const [cyclone_vs_death_india, setLine8data] = useState(
        {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            title: {
                text: "Cyclone v/s Human Death INDIA"
            },
            axisY: {
                title: "Human Deaths",
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

    const [cyclone_vs_loss_world, setLine2data] = useState(
        {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            title: {
                text: "Cyclone v/s Monetory Loss ($M) WORLD"
            },
            axisY: {
                title: "Monetory Loss ($M)",
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

    const [cyclone_vs_loss_india, setLine10data] = useState(
        {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2",
            title: {
                text: "Cyclone v/s Monetory Loss ($M) INDIA"
            },
            axisY: {
                title: "Monetory Loss ($M)",
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

    const [damage_vs_speed_world, setLine4data] = useState({
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Land Damage (Ha) v/s Peak Speed (kmph) WORLD"
        },
        axisX: {
            title: "Peak Speed (kmph)",
            suffix: "kmph",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Land Damage (Ha)",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            markerSize: 15,
            toolTipContent: "Peak Speed: {x}kmph Land Damage: { y }Ha",
            dataPoints: [
            ]
        }]
    })

    const [damage_vs_speed_india, setLine9data] = useState({
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Land Damage (Ha) v/s Peak Speed (kmph) INDIA"
        },
        axisX: {
            title: "Peak Speed (kmph)",
            suffix: "kmph",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Land Damage (Ha)",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            markerSize: 15,
            toolTipContent: "Peak Speed: {x}kmph Land Damage: { y }Ha",
            dataPoints: [
            ]
        }]
    })

    const [gdp_drop_vs_peak_speed_world, setLine6data] = useState({
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "GDP Drop (%) v/s Peak Speed (kmph) WORLD"
        },
        axisX: {
            title: "Peak Speed (kmph)",
            suffix: "kmph",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "GDP Drop (%)",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            markerSize: 15,
            toolTipContent: "Peak Speed: {x}kmph GDP Drop: { y }%",
            dataPoints: [
            ]
        }]
    })
    const [gdp_drop_vs_peak_speed_india, setLine7data] = useState({
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "GDP Drop (%) v/s Peak Speed (kmph) INDIA"
        },
        axisX: {
            title: "Peak Speed (kmph)",
            suffix: "kmph",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "GDP Drop (%)",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            markerSize: 15,
            toolTipContent: "Peak Speed: {x}kmph GDP Drop: { y }%",
            dataPoints: [
            ]
        }]
    })
    const [loss_vs_peak_speed_world, setLine11data] = useState({
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Monetory Loss ($M) v/s Peak Speed (kmph) WORLD"
        },
        axisX: {
            title: "Peak Speed (kmph)",
            suffix: "kmph",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Monetory Loss ($M)",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            markerSize: 15,
            toolTipContent: "Peak Speed: {x}kmph Monetory Loss { y }($M)",
            dataPoints: [
            ]
        }]
    })
    const [loss_vs_peak_speed_india, setLine12data] = useState({
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Monetory Loss ($M) v/s Peak Speed (kmph) INDIA"
        },
        axisX: {
            title: "Peak Speed (kmph)",
            suffix: "kmph",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Monetory Loss ($M)",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            markerSize: 15,
            toolTipContent: "Peak Speed: {x}kmph Monetory Loss { y }($M)",
            dataPoints: [
            ]
        }]
    })

    const [death_vs_peak_speed_world, setLine13data] = useState({
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Human Death v/s Peak Speed (kmph) WORLD"
        },
        axisX: {
            title: "Peak Speed (kmph)",
            suffix: "kmph",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Human Death",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            markerSize: 15,
            toolTipContent: "Peak Speed: {x}kmph Human Death { y }",
            dataPoints: [
            ]
        }]
    })
    const [death_vs_peak_speed_india, setLine14data] = useState({
        theme: "light2",
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Human Death v/s Peak Speed (kmph) INDIA"
        },
        axisX: {
            title: "Peak Speed (kmph)",
            suffix: "kmph",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Human Death",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        data: [{
            type: "scatter",
            markerSize: 15,
            toolTipContent: "Peak Speed: {x}kmph Human Death { y }",
            dataPoints: [
            ]
        }]
    })
    useEffect(() => {

        db.collection("INDIA").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                cyclone_vs_peak_speed_india.data[0].dataPoints.push({ label: doc.data()["name"], y: doc.data()["peak_speed"] });
                cyclone_vs_loss_india.data[0].dataPoints.push({ label: doc.data()["name"], y: doc.data()["loss"] });
                cyclone_vs_death_india.data[0].dataPoints.push({ label: doc.data()["name"], y: doc.data()["death"] });
                damage_vs_speed_india.data[0].dataPoints.push({ x: doc.data()["peak_speed"], y: doc.data()["damage"] });
                gdp_drop_vs_peak_speed_india.data[0].dataPoints.push({ x: doc.data()["peak_speed"], y: doc.data()["gdp_drop"] });
                loss_vs_peak_speed_india.data[0].dataPoints.push({ x: doc.data()["peak_speed"], y: doc.data()["loss"] });
                death_vs_peak_speed_india.data[0].dataPoints.push({ x: doc.data()["peak_speed"], y: doc.data()["death"] });
            });
        });
        db.collection("WORLD").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                cyclone_vs_peak_speed_world.data[0].dataPoints.push({ label: doc.data()["name"], y: doc.data()["peak_speed"] });
                cyclone_vs_loss_world.data[0].dataPoints.push({ label: doc.data()["name"], y: doc.data()["loss"] });
                cyclone_vs_death_world.data[0].dataPoints.push({ label: doc.data()["name"], y: doc.data()["death"] });
                damage_vs_speed_world.data[0].dataPoints.push({ x: doc.data()["peak_speed"], y: doc.data()["damage"] });
                gdp_drop_vs_peak_speed_world.data[0].dataPoints.push({ x: doc.data()["peak_speed"], y: doc.data()["gdp_drop"] });
                loss_vs_peak_speed_world.data[0].dataPoints.push({ x: doc.data()["peak_speed"], y: doc.data()["loss"] });
                death_vs_peak_speed_world.data[0].dataPoints.push({ x: doc.data()["peak_speed"], y: doc.data()["death"] });
            });
        });
        console.log(cyclone_vs_peak_speed_world.data[0].dataPoints);
        console.log(cyclone_vs_loss_world.data[0].dataPoints);
    }, []);
    const [show_graph, setShow_graph] = useState(false);
    return (
        <>
            <div align="center">
                {/* <button onClick={() => {
                    setShow_graph(!show_graph);
                    console.log(show_graph);
                }}>Show Graph</button>
                {show_graph ? <CanvasJSChart options={cyclone_vs_peak_speed_world} /> : null}
                <br></br><br></br>
                {show_graph ? <CanvasJSChart options={cyclone_vs_peak_speed_india} /> : null}
                <br></br><br></br>
                {show_graph ? <CanvasJSChart options={cyclone_vs_loss} /> : null}
                <br></br><br></br>
                {show_graph ? <CanvasJSChart options={cyclone_vs_death_world} /> : null}
                <br></br><br></br>
                {show_graph ? <CanvasJSChart options={damage_vs_speed_world} /> : null}
                <br></br><br></br>
                {show_graph ? <CanvasJSChart options={gdp_drop_vs_peak_speed_world} /> : null}
                <br></br><br></br>
                {show_graph ? <CanvasJSChart options={gdp_drop_vs_peak_speed_india} /> : null} */}
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs centered value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="INDIA" {...a11yProps(0)} />
                            <Tab label="WORLD" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                    <br></br><br></br>
                    <CanvasJSChart options={cyclone_vs_peak_speed_india} />
                    <br></br><br></br>
                    <CanvasJSChart options={cyclone_vs_death_india} />
                    <br></br><br></br>
                    <CanvasJSChart options={cyclone_vs_loss_india} />
                    <br></br><br></br>
                    <CanvasJSChart options={gdp_drop_vs_peak_speed_india} />
                    <br></br><br></br>
                    <CanvasJSChart options={damage_vs_speed_india} />
                    <br></br><br></br>
                    <CanvasJSChart options={loss_vs_peak_speed_india} />
                    <br></br><br></br>
                    <CanvasJSChart options={death_vs_peak_speed_india} />
                    <br></br><br></br>
                    </TabPanel>

                    <TabPanel value={value} index={1}>
                    <br></br><br></br>
                    <CanvasJSChart options={cyclone_vs_peak_speed_world} />
                    <br></br><br></br>
                    <CanvasJSChart options={cyclone_vs_death_world} />
                    <br></br><br></br>
                    <CanvasJSChart options={cyclone_vs_loss_world} />
                    <br></br><br></br>
                    <CanvasJSChart options={gdp_drop_vs_peak_speed_world} />
                    <br></br><br></br>
                    <CanvasJSChart options={damage_vs_speed_world} />
                    <br></br><br></br>
                    <CanvasJSChart options={loss_vs_peak_speed_world} />
                    <br></br><br></br>
                    <CanvasJSChart options={death_vs_peak_speed_world} />
                    <br></br><br></br>
                    </TabPanel>
                </Box>
            </div>
        </>
    );
}






