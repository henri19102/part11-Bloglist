// import React from 'react'
// import PropTypes from 'prop-types'

// const Blog = ({ blog, handleLike, handleRemove}) => {

//   const blogStyle = {
//     paddingTop: 10,
//     paddingLeft: 2,
//     border: 'solid',
//     borderWidth: 1,
//     marginBottom: 5
//   }

//   return (
//     <div style={blogStyle} className='blog'>
//       <div>
//         <p>{blog.title} by {blog.author} -- {blog.url}</p>
//         <div>{blog.user.name}</div>
//       </div>
//       <div>
//           <div>likes {blog.likes}
//             <button onClick={() => handleLike(blog.id)}>like</button>
//           </div>
//           <div>
//         <button onClick={() => handleRemove(blog.id)}>remove</button>
//          </div>
//         </div>

//     </div>
//   )
// }

// Blog.propTypes = {
//   blog: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     author: PropTypes.string.isRequired,
//     url: PropTypes.string.isRequired,
//   }).isRequired,
//   handleLike: PropTypes.func.isRequired,
//   handleRemove: PropTypes.func.isRequired,
//   //own: PropTypes.bool.isRequired
// }

// export default Blog
