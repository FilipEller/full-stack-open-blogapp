import React from 'react'
import Blog from './Blog'
import { Box } from '@mui/material'

const BlogList = ({ blogs, likeBlog, user, deleteBlog }) => {
  return (
    <Box>
      {blogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            user={user}
            deleteBlog={deleteBlog}
          />
        ))}
    </Box>
  )
}

export default BlogList
