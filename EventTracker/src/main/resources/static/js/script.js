window.addEventListener('load', function (e) {
	console.log('document loaded');
	init();

});

function init() {
	// search by id form
	document.crimeForm.lookup.addEventListener('click', function (event) {
		event.preventDefault();
		var crimeId = document.crimeForm.crimeId.value;
		if (!isNaN(crimeId) && crimeId > 0) {
			getCrime(crimeId);
			// resets the form after you search
			let form = event.target.parentElement;
			form.reset();
		}
	})

	// create crime
	document.createCrimeForm.create.addEventListener('click', function (event) {
		event.preventDefault();
		let newCrime = {};
		let crName = document.createCrimeForm.crimeName.value;
		let nborhood = document.createCrimeForm.neighborhood.value;

		newCrime.crimeName = crName;
		newCrime.neighborhood = nborhood;
		if (newCrime) {
			postCrime(newCrime);
			newCrime = {};
			getCrimes();
		}
	})

	// neighborhoods search form
	document.searchNeighborhoodForm.search.addEventListener('click', function (event) {
		event.preventDefault();
		let searchTerm = document.searchNeighborhoodForm.neighborhood.value;
		let arrayOfNeighborhood = [];
		// return array of crimes
		function getCrimesArray() {
			let xhr = new XMLHttpRequest();
			var crimesArray = [];
			xhr.open('GET', 'api/crimes/');

			xhr.onreadystatechange = function () {
				// If status is below error range, and readyState is 4 (DONE)
				if (xhr.readyState === 4 && xhr.status < 400) {
					crimes = JSON.parse(xhr.responseText);
					for (let i = 0; i < crimes.length; i++) {
						if (searchTerm == crimes[i].neighborhood) {
							crimesArray.push(crimes[i]);
						}

					}
					console.log(crimesArray);
					return crimesArray;
				}

				if (xhr.readyState === 4 && xhr.status >= 400) {
					console.log(xhr.status + ': ' + xhr.responseText);
					let crimeData = document.getElementById('allCrimeData');
					crimeData.textContent = "Neighborhood not found";

				}
			};
			if (crimesArray)
				xhr.send(null);
		}
		arrayOfNeighborhood = this.getCrimesArray();
		console.log(arrayOfNeighborhood);
		displayNeighborhoods(arrayOfNeighborhood);

	})

	getCrimes();
}

function getCrime(crimeId) {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/crimes/' + crimeId);

	xhr.onreadystatechange = function () {
		// If status is below error range, and readyState is 4 (DONE)
		if (xhr.readyState === 4 && xhr.status < 400) {
			var crime = JSON.parse(xhr.responseText);
			crimeDetail(crime);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.log(xhr.status + ': ' + xhr.responseText);
			let crimeData = document.getElementById('crimeData');
			crimeData.textContent = "Crime not found";

		}
	};

	xhr.send(null);
}

function displayAllCrimes(crimes) {
	let allCrimes = crimes;
	let crimeDiv = document.getElementById('allCrimeData');
	crimeDiv.textContent = '';

	let table = document.createElement('table');

	let thead = document.createElement('thead');

	let headRow = document.createElement('tr');

	let th1 = document.createElement('th');
	th1.textContent = 'Id';

	let th2 = document.createElement('th');
	th2.textContent = 'Crime';

	let th3 = document.createElement('th');
	th3.textContent = 'Neighborhood';

	headRow.appendChild(th1);
	headRow.appendChild(th2);
	headRow.appendChild(th3);

	thead.appendChild(headRow);
	table.appendChild(thead);

	let tbody = document.createElement('tbody');

	allCrimes.forEach(function (value, index, array) {

		let tbodyRow = document.createElement('tr');

		let tbodyData1 = document.createElement('td');
		let tbodyData2 = document.createElement('td');
		let tbodyData3 = document.createElement('td');

		tbodyData1.textContent = value.id;
		tbodyRow.appendChild(tbodyData1);


		tbodyData2.textContent = value.crimeName;
		tbodyData2.addEventListener('click', function (e) {
			crimeDetail(value);
		});
		tbodyRow.appendChild(tbodyData2);

		tbodyData3.textContent = value.neighborhood;
		tbodyRow.appendChild(tbodyData3);

		tbody.appendChild(tbodyRow);
		table.appendChild(tbody);
	});

	crimeDiv.appendChild(table);

}

function crimeDetail(crime) {

	let singleCrimeData = document.getElementById('singleCrimeData');
	singleCrimeData.textContent = '';

	let h2Title = document.createElement('h2');
	h2Title.textContent = crime.crimeName;
	singleCrimeData.appendChild(h2Title);

	let neighborhood = document.createElement('p');
	neighborhood.textContent = crime.neighborhood;
	singleCrimeData.appendChild(neighborhood);

	let btnBack = document.createElement('button');
	btnBack.textContent = "Go Back";

	// edit and back button event listeners
	let btnEdit = document.createElement('button');
	btnEdit.textContent = "Edit Crime";

	let btnDelete = document.createElement('button');
	btnDelete.textContent = "Delete Crime";

	btnBack.addEventListener('click', function (e) {
		singleCrimeData.textContent = '';
		getCrimes();
	});

	btnEdit.addEventListener('click', function (e) {
		editCrime(crime);
		getCrimes();

	});

	btnDelete.addEventListener('click', function (e) {
		e.preventDefault();
		deleteCrime(crime);
		singleCrimeData.textContent = '';
		getCrimes();
	});

	// append the buttons to the crime detail
	singleCrimeData.appendChild(btnBack);
	singleCrimeData.appendChild(btnEdit);
	singleCrimeData.appendChild(btnDelete);


}

function editCrime(crimeObject) {

	let editCrimeDataDiv = document.getElementById('editCrimeData');

	// create the form, give it a name
	var form = document.createElement('form');
	form.name = 'editForm';

	// fields for form
	var crimeIdInput = document.createElement('input');
	crimeIdInput.name = 'id'; // assign a name attribute
	crimeIdInput.type = 'hidden'; // assign a type attribute
	crimeIdInput.value = crimeObject.id; // assign the id value

	form.appendChild(crimeIdInput);

	var crimeNameInput = document.createElement('input');
	crimeNameInput.name = 'crimeName'; // assign a name attribute
	crimeNameInput.type = 'text'; // assign a type attribute
	crimeNameInput.placeholder = crimeObject.crimeName; // assign a placeholder attribute

	form.appendChild(crimeNameInput);

	var crimeNeighborhoodInput = document.createElement('input');
	crimeNeighborhoodInput.name = 'neighborhood'; // assign a name attribute
	crimeNeighborhoodInput.type = 'text'; // assign a type attribute
	crimeNeighborhoodInput.placeholder = crimeObject.neighborhood; // assign a placeholder attribute

	form.appendChild(crimeNeighborhoodInput);

	var submit = document.createElement('input');
	submit.name = 'submit'; // assign a name attribute
	submit.type = 'submit'; // assign a type attribute
	submit.value = 'Submit Form'; // assign a value attribute

	submit.addEventListener('click', function (e) { // Assign an event listener to the submit button variable

		e.preventDefault();
		var form = e.target.parentElement;

		// reassign the crime with updated info
		crimeObject.crimeName = form.crimeName.value;
		crimeObject.neighborhood = form.neighborhood.value;

		// PUT request, update crime
		updateCrime(crimeObject);
		editCrimeData.textContent = '';
		let singleCrimeData = document.getElementById('singleCrimeData');
		singleCrimeData.textContent = '';
		// clear the form data
		form.reset();
		getCrimes();
	});
	form.appendChild(submit);
	editCrimeDataDiv.appendChild(form);
}



// GET display all crimes
function getCrimes() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/crimes/');

	xhr.onreadystatechange = function () {
		// If status is below error range, and readyState is 4 (DONE)
		if (xhr.readyState === 4 && xhr.status < 400) {
			var crimes = JSON.parse(xhr.responseText);
			displayAllCrimes(crimes);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.log(xhr.status + ': ' + xhr.responseText);
			let crimeData = document.getElementById('allCrimeData');
			crimeData.textContent = "Crime not found";

		}
	};

	xhr.send(null);
}



// CREATE crime
function postCrime(crimeObject) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/crimes', true);

	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON
	// request body

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { // Ok or Created
				var crime = JSON.parse(xhr.responseText);
				getCrimes();
			} else {
				console.log("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	var userObjectJson = JSON.stringify(crimeObject); // Convert JS object to
	// JSON string

	xhr.send(userObjectJson);
}

// UPDATE/Put crime

function updateCrime(crimeObject) {
	let xhr = new XMLHttpRequest();
	xhr.open('Put', 'api/crimes/' + crimeObject.id, true);

	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON
	// request body

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { // Ok or Created
				var updatedCrime = JSON.parse(xhr.responseText);
				getCrimes();

			} else {
				console.log("PUT request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	var userObjectJson = JSON.stringify(crimeObject); // Convert JS object to
	// JSON string

	xhr.send(userObjectJson);
}

// DELETE crime

function deleteCrime(crimeObject) {
	let xhr = new XMLHttpRequest();
	xhr.open('Delete', 'api/crimes/' + crimeObject.id, true);

	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON
	// request body

	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { // Ok or Created
				console.log("successfully deleted");
				getCrimes();
			} else {
				console.log("delete request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	var userObjectJson = JSON.stringify(crimeObject); // Convert JS object to
	// JSON string

	xhr.send(userObjectJson);
}

function displayNeighborhoods(crimes) {

	let neighborhoodDiv = document.getElementById('neighborhoodSearchData');
	neighborhoodDiv.textContent = '';

	let table = document.createElement('table');

	let thead = document.createElement('thead');

	let headRow = document.createElement('tr');

	let th1 = document.createElement('th');
	th1.textContent = 'Id';

	let th2 = document.createElement('th');
	th2.textContent = 'Crime';

	let th3 = document.createElement('th');
	th3.textContent = 'Neighborhood';

	headRow.appendChild(th1);
	headRow.appendChild(th2);
	headRow.appendChild(th3);

	thead.appendChild(headRow);
	table.appendChild(thead);

	let tbody = document.createElement('tbody');

	crimes.forEach(function (value, index, array) {

		let tbodyRow = document.createElement('tr');

		let tbodyData1 = document.createElement('td');
		let tbodyData2 = document.createElement('td');
		let tbodyData3 = document.createElement('td');

		tbodyData1.textContent = value.id;
		tbodyRow.appendChild(tbodyData1);


		tbodyData2.textContent = value.crimeName;
		tbodyData2.addEventListener('click', function (e) {
			crimeDetail(value);
		});
		tbodyRow.appendChild(tbodyData2);

		tbodyData3.textContent = value.neighborhood;
		tbodyRow.appendChild(tbodyData3);

		tbody.appendChild(tbodyRow);
		table.appendChild(tbody);
	});

	neighborhoodDiv.appendChild(table);

}