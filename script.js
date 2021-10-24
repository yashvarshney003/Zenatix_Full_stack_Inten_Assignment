console.log("script js impoted");
// varibale for holding values for touch events
var startingX, startingY, movingX, movingY;

const change_background_color = new Event("change_background_color"); // manual event

var score = 0; // Global variable for holding the final score made by contestant

var last_state = new Array(4);// variable to store last state of game(can be removed)

var stack = []; // stack to store previous 10 states.

var grid = document.querySelectorAll('.cell');// imported all div cell having class name cell.It is array of div
// this object maintain value to color

const game_status = document.getElementById("game_status"); // This variable hold the reference of h1 element where we display win or Loose.



// Mapping from integer to color.

const color_map = {
	0: "rgb(205,193,180)",
	2: "#EEE4DA",
	4: "#EEE1C9",
	8: "#F3B27A",
	16: "#F69664",
	32: "#F77C5F",
	64: "#F75F3B",
	128: "#EDD073",
	256: "#5c094f",
	512: "#EDC850",
	1024: "#EDC53F",
	2048: "#EDC22D"
}


var box = new Array(4); // 2048 grid

// This is a list which hold box places which are available to display new 2
//  empty is  used by function place_2, update_empty(), 
var empty = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const num_of_cell = 15;// total number of cell in a game

let current_cell = 0; // temporary variable


// Added event listener to the main document(window)
document.addEventListener('keydown', logKey);

// Call  the move function accordingly to the key pressed.
function logKey(e) {
	switch (e.keyCode) {
		case 39: right();
			break;
		case 37: left();
			break;
		case 38: up();
			break;
		case 40: down();
			break;
		default:
			console.log("Wrong key pressed");
	}
}

// storing div reference in the box variable



for (let i = 0; i <= 3; i++) {
	box[i] = [];
	last_state[i] = [];
	for (let j = 0; j <= 3; j++) {
		grid[current_cell].innerText = 0;
		box[i].push(grid[current_cell]);
		current_cell += 1;
	}
}

// Placing first div
place_2();




// function to generate 2 at r&&om avilable space
function place_2() {
	let final_range = empty.length;  // find the length of epmty array
	let x1; // row 
	let y1; // col
	let place = Math.floor(Math.random() * final_range);// random index
	x1 = parseInt(empty[place] / 4); // will give row at which we will insert 2
	y1 = empty[place] % 4;; // will give col
	box[x1][y1].innerText = 2;
	function_change_background_color(x1, y1); // placing 2
}






function right() {

	if (check_game_status()) {
		save_last_status();
		let changed = false;
		for (let i = 0; i < 4; i++) {

			let range = 3;

			for (let j = 2; j >= 0; j--) {


				let current_column = j;
				let change = false;
				if (parseInt(box[i][j].innerText) != 0) {
					while (current_column < range) {

						if (parseInt(box[i][current_column + 1].innerText) != 0 && (parseInt(box[i][current_column + 1].innerText) == parseInt(box[i][current_column].innerText))) {

							changed = true;

							box[i][current_column + 1].innerText = 2 * parseInt(box[i][current_column + 1].innerText);
							update_score(2 * parseInt(box[i][current_column].innerText));
							box[i][current_column].innerText = 0;

							function_change_background_color(i, current_column);
							function_change_background_color(i, current_column + 1);

							range -= 1;
							break;
						}
						if (parseInt(box[i][current_column + 1].innerText) === 0) {
							changed = true;
							box[i][current_column + 1].innerText = parseInt(box[i][current_column].innerText);
							box[i][current_column].innerText = 0;
							function_change_background_color(i, current_column);
							function_change_background_color(i, current_column + 1);
						}
						current_column += 1;
					}
				}
			}
		}

		update_empty(box);
		if (changed) {
			place_2();
		}
	}



}


function left() {

	if (check_game_status()) {
		save_last_status();
		let changed = false;
		for (let i = 0; i < 4; i++) {

			let range = 0;


			for (let j = 1; j < 4; j++) {


				let current_column = j;
				let change = false;
				if (parseInt(box[i][j].innerText) != 0) {
					while (current_column > range) {

						if (parseInt(box[i][current_column - 1].innerText) != 0 && (parseInt(box[i][current_column - 1].innerText) == parseInt(box[i][current_column].innerText))) {

							changed = true;
							box[i][current_column - 1].innerText = 2 * parseInt(box[i][current_column - 1].innerText);
							update_score(2 * parseInt(box[i][current_column].innerText));
							box[i][current_column].innerText = 0;
							function_change_background_color(i, current_column);
							function_change_background_color(i, current_column - 1);

							range += 1;
							break;
						}
						if (parseInt(box[i][current_column - 1].innerText) === 0) {
							changed = true;
							box[i][current_column - 1].innerText = parseInt(box[i][current_column].innerText);
							box[i][current_column].innerText = 0;
							function_change_background_color(i, current_column);
							function_change_background_color(i, current_column - 1);
						}
						current_column -= 1;
					}
				}
			}
		}

		update_empty(box);
		if (changed) {
			place_2();
		}
	}

}






function up() {


	if (check_game_status()) {
		save_last_status();
		let changed = false;
		for (let j = 0; j < 4; j++) {

			let range = 0;

			for (let i = 1; i < 4; i++) {


				let current_row = i;
				let change = false;
				if (parseInt(box[i][j].innerText) != 0) {
					while (current_row > range) {

						if (parseInt(box[current_row - 1][j].innerText) != 0 && (parseInt(box[current_row - 1][j].innerText) == parseInt(box[current_row][j].innerText))) {

							changed = true;
							box[current_row - 1][j].innerText = 2 * parseInt(box[current_row - 1][j].innerText);
							update_score(2 * parseInt(box[current_row][j].innerText));
							box[current_row][j].innerText = 0;
							function_change_background_color(current_row, j);
							function_change_background_color(current_row - 1, j);

							range += 1;
							break;
						}
						if (parseInt(box[current_row - 1][j].innerText) === 0) {
							changed = true;
							box[current_row - 1][j].innerText = parseInt(box[current_row][j].innerText);
							box[current_row][j].innerText = 0;
							function_change_background_color(current_row, j);
							function_change_background_color(current_row - 1, j);
						}
						current_row -= 1;
					}
				}
			}
		}

		update_empty(box);
		if (changed) {
			place_2();
		}
	}
}




function down() {
	// check for win or loose will return true if win and false if loose
	if (check_game_status()) {
		save_last_status();
		let changed = false;
		for (let j = 0; j < 4; j++) {

			let range = 3;

			for (let i = 2; i >= 0; i--) {


				let current_row = i;
				let change = false;
				if (parseInt(box[i][j].innerText) != 0) {
					while (current_row < range) {

						if (parseInt(box[current_row + 1][j].innerText) != 0 && (parseInt(box[current_row + 1][j].innerText) == parseInt(box[current_row][j].innerText))) {
						
							changed = true;
							box[current_row + 1][j].innerText = 2 * parseInt(box[current_row][j].innerText);
							update_score(2 * parseInt(box[current_row][j].innerText));
							box[current_row][j].innerText = 0;
							function_change_background_color(current_row, j);
							function_change_background_color(current_row + 1, j);

							range -= 1;
							break;
						}
						if (parseInt(box[current_row + 1][j].innerText) === 0) {
							changed = true;
							box[current_row + 1][j].innerText = parseInt(box[current_row][j].innerText);
							box[current_row][j].innerText = 0;
							function_change_background_color(current_row, j);
							function_change_background_color(current_row + 1, j);
						}
						current_row += 1;
					}
				}
			}
		}

		update_empty(box);
		if (changed) {

			place_2();
		}
	}

}

// Input: Copy of 2D array of original 2048.
// function: It updates the empty array if particular box is empty then push back it in empty array and if is not then remove it from empty array


function update_empty(arr) {

	for (let j = 0; j < 4; j++) {
		for (let i = 0; i < 4; i++) {

			if (parseInt(arr[j][i].innerText) != 0) {// If innner text is not equal to zero
				if (empty.includes((j * 4) + i)) { // If it is present in empty array then remove it
					empty.splice(empty.indexOf((j * 4) + i), 1); // find index of place then remove it using splice function
				}

			}
			else {
				if (!empty.includes((j * 4) + i)) {// if it zero and  it is not present in empty array push it back.
					empty.push((j * 4) + i);
				}

			}
		}

	}

}


// Input: ith row and jth col of 2d grid(2048)
// Change the background color of div background according to innerText
//

function function_change_background_color(i, j) {

	// 
	box[i][j].addEventListener('change_background_color', (e) => {


		box[i][j].style.backgroundColor = color_map[parseInt(box[i][j].innerText)]; // changing the background color using DOM api

	});
	box[i][j].dispatchEvent(change_background_color); // Dispatch event 



}






// Input: Integer value which is added to the current score value.
// Input can be negative and positive also.


function update_score(num) {
	score = score + num;
	let scoretext = document.getElementById("score");
	scoretext.innerText = score;

}

// This function will check for win and loose return accordingly
// if any div inner text is equal to 2048 then display win and if any further move is not possible then show loose
function check_game_status() {



	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (parseInt(box[i][j].innerText) == 2048) {
				game_status.style.display = "block"; // change display to block to show 
				game_status.innerText = "You Win"; // change text
				return true; // returning true because further move is possible
			}
			else {
				// if ant div inner text is equal to 0  or any neighbour div inner text is equal then further move are possibke
				// check in all four direction	
				if (parseInt(box[i][j].innerText) == 0) {
					return true;
				}
				if (i - 1 > 0) {
					if (parseInt(box[i][j].innerText) == parseInt(box[i - 1][j].innerText)) {

						return true;
					}

				}
				if (j - 1 > 0) {
					if (parseInt(box[i][j - 1].innerText) == parseInt(box[i][j].innerText)) {

						return true;
					}

				}
				if (i + 1 < 4) {
					if (parseInt(box[i + 1][j].innerText) == parseInt(box[i][j].innerText)) {

						return true;
					}

				}
				if (j + 1 < 4) {
					if (parseInt(box[i][j + 1].innerText) == parseInt(box[i][j].innerText)) {

						return true;
					}

				}



			}
		}
	}
	// if any further move is not possible then user lost the game change the status accordingly.
	game_status.style.display = "block";
	game_status.innerText = "You Loose";

	return false;
}


// It store the current state before any move.

function save_last_status() {
	// If stack size is greater than 10 remove the first
	if (stack.length > 10) {
		let garbage = stack.shift();
	}

	let ele = {
		"configuration": last_state,
		"score": score
	};
	// push into the stack
	stack.push(ele);

	// Redefining array and storing current state into variable last_state
	last_state = new Array(4);
	for (let i = 0; i < 4; i++) {
		last_state[i] = [];
		for (let j = 0; j < 4; j++) {
			last_state[i].push(parseInt(box[i][j].innerText));
		}
	}
}



function undo() {

	game_status.style.display = "none"; // if game_status is visible make univisible 
	// Now store the last_state into box configuartion(2048 grid)
	if (stack.length > 0) {
		for (let i = 0; i < 4; i++) {

			for (let j = 0; j < 4; j++) {
				box[i][j].innerText = last_state[i][j];
				function_change_background_color(i, j);

			}
		}
		let popped_element = stack.pop(); //Now pop second last configuartion  and store in last_state
		last_state = popped_element.configuration; // Assigning value to last state
		let change = popped_element.score; // updating score variable in JS
		update_score(-1 * (score - change)); // Updating score on front end

	}
}


function touchstart(evt) {

	startingX = evt.touches[0].clientX;
	startingY = evt.touches[0].clientY;

}


function touchmoving(evt) {
	movingX = evt.touches[0].clientX;
	movingY = evt.touches[0].clientY;
}


function touchend(evt) {
	if (startingX + 100 < movingX) {
		right();
	}
	else if (startingX - 100 > movingX) {
		left();
	}
	else if (startingY + 100 < movingY) {
		down();
	}
	else
		up();
}

