// src/js/ui.js
import { getBlogs } from './data.js';

export function renderBlogList(container) {
  container.innerHTML = '';
  getBlogs().forEach(blog => {
    const li = document.createElement('li');
    li.innerHTML = `
  <h3>${blog.title}</h3>
  <p>${blog.body}</p>

  ${
 blog.image
 ? `<img src="${blog.image}" alt="${blog.title}">`
 : ""
}

  <button class="edit-btn" data-id="${blog.id}">
    Edit
  </button>

  <button class="delete-btn" data-id="${blog.id}">
    Delete
  </button>
`;
    container.appendChild(li);
  });
}

export function bindDeleteEvents(container, onDelete) {
  container.addEventListener('click', e => {
    if(e.target.classList.contains("delete-btn")) {
      const id = parseInt(e.target.dataset.id);
      onDelete(id);
    }
  });
}