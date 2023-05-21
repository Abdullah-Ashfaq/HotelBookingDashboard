import React, { useState } from 'react'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { Alert, Button, IconButton, TextField } from '@mui/material';


const Login = ({ onLogin }) => {
  const [userName, SetUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const Navigate = useNavigate()


  const handleLoginForm = (event) => {
    event.preventDefault()
    if (userName === 'Admin' && password === "Admin@555") {
      // called the parent function to update the sate
      onLogin()
      Navigate('/home')

    } else {
      console.log("invalid credentials")
      setErrorMessage(true)
      setTimeout(() => {
        setErrorMessage(false)
      }, 3000);
      SetUserName('')
      setPassword('')

    }

  }
  return (
    <div className="container">
      <div className="login-form">

        {/* <IconButton disableRipple>
          <LoginOutlinedIcon fontSize='large' color='primary' />
        </IconButton> */}
        <img src="logo.jpg" style={{height: "4rem", width: "4rem", objectFit: "contain", borderRadius: "10px", cursor:"pointer"}} alt="" />

        <form
          onSubmit={handleLoginForm}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%"
          }} >
          <TextField variant='outlined'
            color='primary' 
            label='UserName'
            fullWidth
            size='small'
            required
            value={userName}
            onChange={(event) => SetUserName(event.target.value)}
           

          />

          <TextField variant='outlined'
            color='primary'
            label='Password'
            fullWidth
            size='small'
            required
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            

          />

          <Button size='small'
            variant='contained'
            color='primary'
            // sx={{
            //   backgroundColor: "#58D5D3",
            //   color: "white",
            //   '&:hover': {
            //     backgroundColor: '#58D5D3'
            //   }

            // }}
            type='submit'
            disableRipple>

            Login</Button>

        </form>
        {errorMessage &&

          <Alert variant="filled" severity="error" fontSize='small'>
            Invalid Username or Password
          </Alert>

        }


      </div>

    </div>
  )
}

export default Login