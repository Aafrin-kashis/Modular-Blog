// src/js/data.js
let blogs = JSON.parse(localStorage.getItem("blogs")) || [];


// Get all blogs
export function getBlogs() {
  return blogs;
}


// Add blog
export function addBlog(blog) {
  blogs.push(blog);
  saveBlogs();

}


// Delete blog
export function deleteBlog(id) {
  blogs = blogs.filter(blog => blog.id !== id);
  saveBlogs();

}

export function updateBlog(updatedBlog) {
  blogs = blogs.map(blog =>
    blog.id === updatedBlog.id ? updatedBlog : blog
  );

  saveBlogs();

}


// Save data in localStorage
function saveBlogs() {

  localStorage.setItem(
    "blogs",
    JSON.stringify(blogs)
  );
}