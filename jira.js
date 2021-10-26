let new_task =  document.querySelector(".new_task");
let add_btn = document.querySelector(".add-btn");
let task_area =  document.querySelector(".task-area");
let text_area =  document.querySelector(".description");
let priority_colors = document.querySelectorAll(".p-color");
let priority = "black"; 
let id= "#4567";
let task_list = []
console.log(priority);
function Task(color,id,text)
{
	this.color = color;
  this.id = id;
  this.text = text;
}
function add_task_in_list(color,id,text)
 {		
	 let new_task =  new Task(color,id,text);
	 task_list.push(new_task);
	 console.log(task_list);



 }

console.log(priority_colors);
let flag = false;
let all_task_objects =  {};// variable to store all task
add_btn.addEventListener("click",(e) => {
	flag = !flag ;
	console.log(flag);
	if(flag) 
	 new_task.style.display =  "flex";
	 else 
		new_task.style.display = "none";
});

function create_task1()
{
	console.log("here we are");
	let  create_task =  document.createElement("div");
	create_task.style.display = "flex";
	create_task.setAttribute("class","task");
	create_task.innerHTML = `
	<div class="priority-color"></div>
	<div class="task-index"></div>
	<div class="task-description"></div>
`;
add_task_in_list(priority,id,text_area.value);
create_task.childNodes[1].style.backgroundColor =priority;
create_task.childNodes[3].innerText = id;
create_task.childNodes[5].innerText = text_area.value;

console.log(create_task);
task_area.appendChild(create_task);
flag =  false;
new_task.style.display = "none";
text_area.value =  null;


}
function retrieve_all_task_from_local_storage(){
	console.log("yash is here");
}
function set_priority(id)
{
	for(let i = 1;i<=4;i++)
	  {
		  
		  if(priority_colors[i-1].classList.contains("border"))
		   {	console.log("sothe desire");
			   priority_colors[i-1].classList.remove("border");
	  }
	  }	
	  let set_priority_color =  document.getElementById(id);
	  set_priority_color.classList.add("border");
	  
	  priority = set_priority_color.style.backgroundColor;
	  
}