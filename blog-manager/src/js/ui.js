import {filterBlogs} from "./data.js";

export function renderBlogList(container,search=""){

container.innerHTML="";

let blogs=filterBlogs(search);

if(blogs.length===0){

container.innerHTML="<h3>No Blogs Found</h3>";
return;

}

blogs.forEach(blog=>{

let li=document.createElement("li");

li.innerHTML=`

${blog.image?`<img src="${blog.image}" alt="blog image">`:""}

<h3>${blog.title}</h3>

<p>${blog.body}</p>

<div class="meta">
<span>Date: ${blog.date||"Not Available"}</span>
<span>Time: ${blog.time||"Not Available"}</span>
</div>

<small>
Tags: ${blog.tags.join(", ")}
</small>

<div class="actions">

<button class="edit" data-id="${blog.id}">
Edit
</button>

<button class="delete" data-id="${blog.id}">
Delete
</button>

</div>

`;

container.appendChild(li);

});

}


export function bindEvents(container,callback){

container.addEventListener("click",e=>{

let id=Number(e.target.dataset.id);

if(e.target.classList.contains("delete")){

callback.delete(id);

}

if(e.target.classList.contains("edit")){

callback.edit(id);

}

});

}