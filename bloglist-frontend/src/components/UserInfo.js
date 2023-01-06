import React from 'react'
import { Button, Box } from '@mui/material'

const UserInfo = ({ name, handleLogout }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
      <Box component='span' sx={{ fontFamily: 'Roboto', my: 2}}>
        {name} is logged in.
      </Box>
      <Button variant='contained' onClick={() => handleLogout()}>
        Log out
      </Button>
    </Box>
  )
}

export default UserInfo
