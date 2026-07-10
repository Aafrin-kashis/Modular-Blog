// src/main.js
import { addBlog, deleteBlog, updateBlog, getBlogs } from './js/data.js';
import { renderBlogList, bindDeleteEvents } from './js/ui.js';

const form = document.getElementById('blog-form');
const titleInput = document.getElementById('title');
const bodyInput = document.getElementById('body');
const blogList = document.getElementById('blog-list');

let editingId = null;

form.addEventListener('submit', e => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title || !body) return;

  if(editingId){
  updateBlog(
    {
    id: editingId,
    title,
    body
  });
  editingId = null;
}else{
  addBlog({
    id: Date.now(),
    title,
    body
  });

}

renderBlogList(blogList);
form.reset();

  addBlog(newBlog);
  renderBlogList(blogList);
  form.reset();
});

bindDeleteEvents(blogList, (id) => {
  deleteBlog(id);
  renderBlogList(blogList);
});


blogList.addEventListener("click",(e)=>{

  if(e.target.classList.contains("edit-btn")){
    const id = Number(e.target.dataset.id);
    const blog = getBlogs().find(blog => blog.id === id);
    editingId = id;
    titleInput.value = blog.title;
    bodyInput.value = blog.body;
  }

});

// Initial render
renderBlogList(blogList);