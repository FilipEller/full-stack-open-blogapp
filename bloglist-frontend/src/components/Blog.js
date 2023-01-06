import React, { useState } from 'react'
import { Paper, Grid, Button, Box } from '@mui/material'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, user, deleteBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const gridStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  return (
    <Paper
      variant='outlined'
      sx={{
        fontFamily: 'Roboto',
        wordWrap: 'break-word',
        my: 2,
        p: 2,
      }}
      className='blog'
      component='article'>
      <Grid container sx={gridStyle}>
        <Grid item xs={7}>
          <div>
            <div>
              <i>{blog.title}</i>
            </div>
            {showDetails && (
              <Box sx={{ '& div': { mt: 1 } }}>
                <div>
                  {'<'}
                  <a href={blog.url}>{blog.url}</a>
                  {'>'}
                </div>
                <div>User: {blog.user.username}</div>
                <div>
                  Likes: {blog.likes}{' '}
                  <Button size='small' onClick={() => likeBlog(blog)}>
                    Like
                  </Button>
                </div>
                {user.username === blog.user.username && (
                  <div>
                    <Button
                      variant='outlined'
                      size='small'
                      onClick={() => deleteBlog(blog)}>
                      Delete
                    </Button>
                  </div>
                )}
              </Box>
            )}
          </div>
        </Grid>
        <Grid item xs={4} sx={gridStyle}>
          <div>{blog.author}</div>
          <Button
            sx={{ fontSize: 16 }}
            onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? 'Hide' : 'View'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
