import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import { MenuItem, TextField } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay';
import axios from 'axios';
import '../Css/Home.css'



const Home = () => {
    const [data, setData] = useState([])
    const [filterDate, setFilterDate] = useState('All')
    const [filterData, setFilterData] = useState([])
    const [revenue, setRevenue] = useState(0)

    const today = useMemo(() => new Date(), []);
    const lastWeek = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() - 7);
        return d;
    }, []);
    // console.log("today's date",today)
    // console.log("last week", lastWeek)


    const handleSelectChange = (event) => {
        const value = event.target.value
        setFilterDate(value)
        if (value === 'All') {
            setFilterData(data)
        }
        else if (value === 'today') {
            const filtered = data.filter((val) => {
                const date = new Date(val.Date);
                return date === today;

            });
            setFilterData(filtered)
        }
        else if (value === 'lastweek') {
            const filtered = data.filter((val) => {
                const date = new Date(val.Date);
                return date >= lastWeek && date < today;
            });
            setFilterData(filtered)
        }
        else if (value === 'completed') {
            const filtered = data.filter((val) => {
                // const date = new Date(val.Date);
                const endTime = new Date(`${val.Date}T${val["End Time"]}`);
                return endTime < today.getTime()

            });
            setFilterData(filtered)
        }
        else if (value === 'pending') {
            const filtered = data.filter((val) => {
                // const date = new Date(val.Date);
                const endTime = new Date(`${val.Date}T${val["End Time"]}`);
                return endTime > today.getTime()

            });
            setFilterData(filtered)
        }
    }



    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(`https://64589c7c4eb3f674df784d5d.mockapi.io/Users`);
            setData(response.data)

        } catch (error) {
            console.log("Error while fetching the packages from an api")
        }

    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    useEffect(() => {
        if (filterDate === 'All') {
            setFilterData(data)
        }
        else if (filterDate === 'today') {
            const filtered = data.filter((val) => {
                const date = new Date(val.Date);
                console.log("todays option", date)
                console.log("todays date", today)
                if (date.getDate() === today.getDate()) {
                    console.log("date matched")
                    return date;
                }
                else {
                    console.log("not matched")
                }



            });
            setFilterData(filtered)
        }
        else if (filterDate === 'lastweek') {
            const filtered = data.filter((val) => {
                const date = new Date(val.Date);
                if (date >= lastWeek && date < today) {
                    return date;
                } else {
                    console.log("no data of last week")
                }

            });
            setFilterData(filtered)
        }

        else if (filterDate === 'completed') {
            const filtered = data.filter((val) => {
                // const date = new Date(val.Date);
                const endTime = new Date(`${val.Date}T${val["End Time"]}`);
                if (today.getTime() > endTime) {

                    return endTime
                }
                else {
                    console.log("no completed date yet")
                }

            });
            setFilterData(filtered)
        }
        else if (filterDate === 'pending') {
            const filtered = data.filter((val) => {
                // const date = new Date(val.Date);
                const endTime = new Date(`${val.Date}T${val["End Time"]}`);
                if (endTime > today.getTime()) {
                    console.log("pending date", endTime)
                    return endTime
                }
                else {
                    console.log("no current pending dates")
                }


            });
            setFilterData(filtered)
        }


    }, [data, filterDate, today, lastWeek], Object.is)

    useEffect(() => {
        const sum = filterData.reduce((acc, item) => acc + item.Price, 0);
        setRevenue(sum);
    }, [filterData]);

    const getUpdatedData = () => {
        axios.get(`https://64589c7c4eb3f674df784d5d.mockapi.io/Users`)
            .then((response) => {
                setData(response.data)


            })
    }

    const onDelete = (id) => {
        axios.delete(`https://64589c7c4eb3f674df784d5d.mockapi.io/Users/${id}`)
            .then(() => {
                getUpdatedData();


            })
    }
    return (
        <>
            <Header />

            <div className="Filter-header">
                <TextField
                    value={filterDate}
                    variant="outlined"
                    size='small'
                    label='Filter'
                    select
                    color='secondary'

                    sx={{
                        width: '220px',

                    }}
                    onChange={handleSelectChange}>
                    <MenuItem value='today'>Today</MenuItem>
                    <MenuItem value='lastweek'>Last Week</MenuItem>
                    <MenuItem value='completed'>Completed</MenuItem>
                    <MenuItem value='pending'>Pending</MenuItem>
                    <MenuItem value='All'>All</MenuItem>
                </TextField>

                <IconButton onClick={() => getUpdatedData()} sx={{ "&:hover": { backgroundColor: "transparent" } }}>
                    <ReplayIcon fontSize="large" color='secondary' />
                </IconButton>



            </div>
            <TableContainer component={Paper} className='table' sx={{ marginBottom: "5rem" }}>
                <Table >
                    <TableHead>
                        <TableRow >
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">PhoneNo</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Start Time</TableCell>
                            <TableCell align="right">Duration</TableCell>
                            <TableCell align="right">End Time</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterData.map((val) => {
                            return <>
                                <TableRow key={val.id}>
                                    <TableCell>{val["Unique ID"]}</TableCell>
                                    <TableCell align="right">{val.Name}</TableCell>
                                    <TableCell align="right">{val["Phone Number"]}</TableCell>
                                    <TableCell align="right">{val.Date}</TableCell>
                                    <TableCell align="right">{val["Start Time"]}</TableCell>
                                    <TableCell align="right">{val.Duration}</TableCell>
                                    <TableCell align="right">{val["End Time"]}</TableCell>
                                    <TableCell align="right">{val.Price}</TableCell>
                                    <TableCell align="right"><Button size='small' variant='contained' onClick={() => onDelete(val.id)}>delete</Button></TableCell>

                                </TableRow>
                            </>
                        })}
                         <TableRow>
                                    <TableCell align="right" colSpan={8}>{`Revenue: ${revenue}`}</TableCell>
                                </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <Footer />
        </>
    )
}

export default Home

