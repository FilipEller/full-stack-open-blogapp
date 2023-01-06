import React, { useState } from 'react'
import { TextField, Box, Typography, Button } from '@mui/material'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = event => {
    event.preventDefault()
    handleLogin(username, password)
  }

  return (
    <Box
      component='form'
      onSubmit={onLogin}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography variant='h4' gutterBottom component='h4'>
        Log in
      </Typography>
      <Box
        sx={{
          '& .MuiTextField-root': { mb: 2, width: '40ch' },
        }}
        noValidate
        autoComplete='off'>
        <div>
          <TextField
            label='Username'
            variant='outlined'
            required
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label='Password'
            variant='outlined'
            type='password'
            required
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
      </Box>
      <Button sx={{ px: 2 }} variant='contained' type='submit'>
        Log in
      </Button>
    </Box>
  )
}

export default LoginForm
