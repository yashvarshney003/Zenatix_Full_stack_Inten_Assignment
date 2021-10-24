let new_task =  document.querySelector(".new_task");
let add_btn = document.querySelector(".add-btn");
let flag = false;
add_btn.addEventListener("click",(e) => {
	flag = !flag ;
	console.log(flag);
	if(flag) 
	 new_task.style.display =  "flex";
	 else 
		new_task.style.display = "none";
});

