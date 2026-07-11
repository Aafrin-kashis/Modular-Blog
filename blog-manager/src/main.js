import {addBlog,deleteBlog,updateBlog,getBlogs} from "./js/data.js";
import {renderBlogList,bindEvents} from "./js/ui.js";

const form=document.getElementById("blog-form");
const title=document.getElementById("title");
const body=document.getElementById("body");
const image=document.getElementById("image");
const tags=document.getElementById("tags");
const editId=document.getElementById("edit-id");
const list=document.getElementById("blog-list");
const search=document.getElementById("search");
const preview=document.getElementById("preview");
const count=document.getElementById("count");
const themeBtn=document.getElementById("themeBtn");

function updateCount(){
count.innerText=getBlogs().length;
}

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="dark"){
document.body.classList.add("dark");
themeBtn.innerText="Light Mode";
}

themeBtn.onclick=()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
themeBtn.innerText="Light Mode";
}else{
localStorage.setItem("theme","light");
themeBtn.innerText="Dark Mode";
}

};

form.addEventListener("submit",e=>{

e.preventDefault();

let data={
title:title.value.trim(),
body:body.value.trim(),
image:image.value.trim(),
tags:tags.value.split(",").map(t=>t.trim().toLowerCase()),
date:new Date().toLocaleDateString(),
time:new Date().toLocaleTimeString()
};

if(editId.value){

updateBlog(Number(editId.value),data);
editId.value="";

}else{

addBlog({
id:Date.now(),
...data
});

}

form.reset();
preview.style.display="none";

renderBlogList(list);
updateCount();

});

bindEvents(list,{

delete(id){

deleteBlog(id);
renderBlogList(list);
updateCount();

},

edit(id){

let blog=getBlogs().find(b=>b.id===id);

title.value=blog.title;
body.value=blog.body;
image.value=blog.image;
tags.value=blog.tags.join(",");

editId.value=id;

if(blog.image){

preview.src=blog.image;
preview.style.display="block";

}

window.scrollTo({
top:0,
behavior:"smooth"
});

}

});


search.addEventListener("input",()=>{

renderBlogList(list,search.value);

});


image.addEventListener("input",()=>{

if(image.value){

preview.src=image.value;
preview.style.display="block";

}else{

preview.style.display="none";

}

});


renderBlogList(list);
updateCount();