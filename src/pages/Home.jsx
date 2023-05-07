import React, { useEffect, useState } from 'react'
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
import axios from 'axios';
import '../Css/Home.css'

const Home = () => {
    const [data, setData] = useState([])
    const [filterDate, setFilterDate] = useState('All')
    const [filterData, setFilterData] = useState([])

    const today = new Date();
  const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

    const handleSelectChange = (event) => {
        const value = event.target.value
        setFilterDate(value)
        if (value === 'All') {
          setFilterData(data)
        } 
        else if(value === 'today') {
            const filtered = data.filter((val) => {
                const date = new Date(val.Date);
                return date === today;
              });
              setFilterData(filtered)
        }
        else if (value === 'lastweek') {
          const filtered = data.filter((val) => {
            const date = new Date(val.Date);
            return date >= lastWeek && date <= today;
          });
          setFilterData(filtered)
        }
      }
 
  
 
  const fetchData = async () => {
   try {
     const response = await axios.get(`https://64214b3686992901b2afad2a.mockapi.io/crud`);
     setData(response.data)
     console.log(data)
     
   } catch (error) {
     console.log("Error while fetching the packages from an api")
   }
   
 }

useEffect(() => {
fetchData();
},[fetchData])

useEffect(() => {
    if (filterDate === 'All') {
        setFilterData(data)
      } 
      else if(filterDate === 'today') {
          const filtered = data.filter((val) => {
              const date = new Date(val.Date);
              return date === today;
            });
            setFilterData(filtered)
      }
      else if (filterDate === 'lastweek') {
        const filtered = data.filter((val) => {
          const date = new Date(val.Date);
          return date >= lastWeek && date <= today;
        });
        setFilterData(filtered)
      }
}, [data, filterDate, today, lastWeek], Object.is)


const getUpdatedData = () => {
    axios.get(`https://64214b3686992901b2afad2a.mockapi.io/crud`)
  .then((response)=> {
    setData(response.data)
    
   
  })
  }
  
  const onDelete = (id) => {
    axios.delete(`https://64214b3686992901b2afad2a.mockapi.io/crud/${id}`)
    .then(()=> {
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
              color='success'

              sx={{
                width:'220px',
                
              }}
              onChange={handleSelectChange}>
              <MenuItem value='today'>Today</MenuItem>
              <MenuItem value='lastweek'>Last Week</MenuItem>
              <MenuItem value='All'>All</MenuItem>
            </TextField>

    </div>
    <TableContainer component={Paper} className='table'>
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
            {/* <TableCell align="right">Update</TableCell> */}
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
            {/* <TableCell align="right"><Button size='small' variant='contained'>Update</Button></TableCell> */}
            <TableCell align="right"><Button size='small' variant='contained' onClick={()=>onDelete(val.id)}>delete</Button></TableCell>
          
          </TableRow>
            
            </>
          })}
        
          
        </TableBody>
      </Table>
    </TableContainer>

    <Footer />
    </>
  )
}

export default Home