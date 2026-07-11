let blogs=JSON.parse(localStorage.getItem("blogs"))||[];

export function getBlogs(){
return blogs;
}

function save(){
localStorage.setItem("blogs",JSON.stringify(blogs));
}

export function addBlog(blog){
blogs.push(blog);
save();
}

export function deleteBlog(id){
blogs=blogs.filter(blog=>blog.id!==id);
save();
}

export function updateBlog(id,data){

blogs=blogs.map(blog=>{

if(blog.id===id){
return {...blog,...data};
}

return blog;

});

save();

}

export function filterBlogs(value){

if(!value){
return blogs;
}

return blogs.filter(blog=>

blog.title.toLowerCase().includes(value.toLowerCase()) ||

blog.tags.some(tag=>tag.includes(value.toLowerCase()))

);

}