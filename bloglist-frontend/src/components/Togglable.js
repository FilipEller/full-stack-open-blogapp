import { useState, forwardRef, useImperativeHandle } from 'react'
import { Box, Button } from '@mui/material'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = visible ? 'none' : 'flex'
  const showWhenVisible = visible ? '' : 'none'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <Box
        sx={{
          display: hideWhenVisible,
          justifyContent: 'center',
          p: 2,
        }}>
        <Button variant='contained' onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </Box>
      <div
        style={{
          display: showWhenVisible,
        }}>
        {props.children}
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <Button variant='contained' onClick={toggleVisibility}>
            Cancel
          </Button>
        </Box>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
