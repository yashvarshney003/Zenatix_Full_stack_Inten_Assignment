var grid = document.querySelectorAll('.cell');

let box = new Array(4);
let empty = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // Using this array we successfully insert 2 radomly available spaces
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
		//.log("wrong key pressed");
	}
}

// storing div reference in the box variable
for (let i = 0; i <= 3; i++) {
	box[i] = [];
	for (let j = 0; j <= 3; j++) {
		grid[current_cell].innerText = 0;
		box[i].push(grid[current_cell]);
		current_cell += 1;
	}
}
// generate first 2
place_2();
//  //.log(empty);


// function to generate 2 at r&&om avilable space
function place_2() {
	let final_range = empty.length;  // find the length of epmty array
	let x1; // row 
	let y1; // col
	let place = Math.floor(Math.random() * final_range);// random index
	x1 = parseInt(empty[place] / 4); // will give row at which we will insert 2
	y1 = empty[place] % 4;; // will give col
	box[x1][y1].innerText = 2; // placing 2 
	empty.splice(empty.indexOf(empty[place]), 1); // replacing the index which get filled

}
function right() {
	// make a right move 
	// check for win and lose
	// generate 2 at random available place

	let changed = false;
	let num = 0;
	for (let j = 0; j < 4; j++) {
		let arr = [];
		let arr1 = [];
		let num = 0;
		for (let i = 0; i < 4; i++) {
			arr1.push(parseInt(box[j][i].innerText));
		}

		let arr2 = reverse(arr1);
		arr = slide(arr2);
		arr = merge(arr);


		// Now append zero at the end of list

		// Now merge the elements

		// we merge first col


		// second col

		// third col

		arr = reverse(arr);
		if (check(arr, arr1) == false) {
			changed = true;

			for (let i = 0; i < 4; i++) {
				box[j][i].innerText = arr[i];
			}
		}
		// Now append the position which are  empty and delete we are non empty

		// change innerText 




	}
	update_empty(box);
	if (changed) {
		place_2();
	}

}


function left() {
	let changed = false;
	for (let j = 0; j < 4; j++) {
		let arr = [];
		let num = 0;
		let arr1 = [];

		for (let i = 0; i < 4; i++) {
			arr1.push(parseInt(box[j][i].innerText));
		}
		arr = slide(arr1);
		arr = merge(arr);
		if (check(arr, arr1) == false) {
			changed = true;

			for (let i = 0; i < 4; i++) {
				box[j][i].innerText = arr[i];
			}
		}
		// Now append the position which are  empty and delete we are non empty
		// change innerText 


	}
	update_empty(box);
	if (changed) {
		place_2();
	}
	////.box(empty);

}
function up() {

	// make a right move 
	//.log("up");
	box = transposeArray(box, 16);
	//.log("lets' check");
	//.log(box);
	let changed = false;
	for (let j = 0; j < 4; j++) {
		let arr = [];
		let num = 0;
		let arr1 = [];

		for (let i = 0; i < 4; i++) {
			arr1.push(parseInt(box[j][i].innerText));
		}
		arr = slide(arr1);
		arr = merge(arr);
		if (check(arr, arr1) == false) {
			changed = true;

			for (let i = 0; i < 4; i++) {
				box[j][i].innerText = arr[i];
			}
		}
		// Now append the position which are  empty and delete we are non empty
		// change innerText 


	}
	box = transposeArray(box, 16);
	update_empty(box);
	// check for win && lose
	// generate 2 at r&&om available place
	if (changed) {
		place_2();
	}
}
function down() {
	//.log("up");
	box = transposeArray(box, 16);
	//.log("lets' check");
	//.log(box);
	let changed = false;
	let num = 0;
	for (let j = 0; j < 4; j++) {
		let arr = [];
		let arr1 = [];
		let num = 0;
		for (let i = 0; i < 4; i++) {
			arr1.push(parseInt(box[j][i].innerText));
		}

		let arr2 = reverse(arr1);
		arr = slide(arr2);
		arr = merge(arr);


		// Now append zero at the end of list

		// Now merge the elements

		// we merge first col


		// second col

		// third col

		arr = reverse(arr);
		if (check(arr, arr1) == false) {
			changed = true;

			for (let i = 0; i < 4; i++) {
				box[j][i].innerText = arr[i];
			}
		}
		// Now append the position which are  empty and delete we are non empty

		// change innerText 


		box = transposeArray(box, 16);

	}
	update_empty(box);
	if (changed) {
		place_2();
	}
	// make a right move 
	// check for win && lose
	// generate 2 at r&&om available place





}



function reverse(t) {
	let tmp = [];
	for (let i = 3; i >= 0; i--)
		tmp.push(t[i]);
	return tmp;
}



function check(a, b) {
	for (let i = 0; i < 4; i++)
		if (a[i] != b[i])
			return false;
	return true;
}




function merge(arr) {
	if (arr[1] != 0) {
		if (arr[0] == arr[1]) {
			changed = true;
			arr[0] *= 2;
			arr[1] = 0;
		}
	}

	// second col
	if (arr[2] != 0) {
		if (arr[1] == arr[2]) {
			arr[1] *= 2;
			changed = true;
			arr[2] = 0;
		}
		if (arr[1] == 0) {
			changed = true;
			arr[1] = arr[2];
			arr[2] = 0;
		}
	}
	// third col
	if (arr[3] != 0) {
		if (arr[2] != 0 && arr[2] == arr[3]) {
			changed = true;
			arr[2] *= 2;
			arr[3] = 0;
		}
		if (arr[1] != 0 && arr[1] == arr[3]) {
			changed = true;
			arr[1] *= 2;
			arr[3] = 0;
		}
		if (arr[2] == 0) {
			changed = true;
			arr[2] = arr[3];
			arr[3] = 0;
		}
	}
	return arr;

}




function slide(arr1) {
	let num = 0;
	let arr = []
	for (let i = 0; i < 4; i++) {
		if (arr1[i] != 0) {
			arr.push(arr1[i]);
			num += 1;
		}
	}



	// Now append zero at the end of list
	for (let i = 0; i < 4 - num; i++) {
		arr.push(0);
	}
	return arr;
}



function update_empty(arr) {
	for (let j = 0; j < 4; j++) {
		for (let i = 0; i < 4; i++) {
			//.log(j*4+i);
			if (arr[j][i].innerText !== '0') {
				if (empty.includes((j * 4) + i)) {
					empty.splice(empty.indexOf((j * 4) + i), 1);
				}

			}
			else {
				if (!empty.includes((j * 4) + i)) {
					empty.push((j * 4) + i);
				}

			}
		}

	}
}
function transposeArray(array, arrayLength) {
	////.log("array");
	let newArray = [];
	for (let i = 0; i < array.length; i++) {
		newArray.push([]);
	};
	////.log(newArray);
	// //.length(array.length);

	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			////.log(j,i);
			newArray[i].push(array[j][i]);
		}
	}
	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length; j++) {
			//.log(newArray[i][j].innerText);
			newArray[i][j].innerText = array[j][i].innerText;
		}
	}
	//.log(newArray);

	return newArray;
}

