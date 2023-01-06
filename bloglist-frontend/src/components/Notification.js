import React from 'react'
import { Paper, Box } from '@mui/material'

const UserInfo = ({ message, success }) => {
  const backgroundColor = success ? '#adc178' : '#f07167'

  return (
    <Paper
      elevation={2}
      sx={{
        px: 3,
        mb: 3,
        backgroundColor,
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box component='span' sx={{ fontFamily: 'Roboto', my: 2 }}>
          {message}
        </Box>
      </Box>
    </Paper>
  )
}

export default UserInfo
