window.addEventListener('load', function(e) {
	console.log('document loaded');
	init();
	getCrimes();
});

function init() {
	document.crimeForm.lookup.addEventListener('click', function(event) {
		event.preventDefault();
		var crimeId = document.crimeForm.crimeId.value;
		if (!isNaN(crimeId) && crimeId > 0) {
			getCrime(crimeId);
		}
	})

	document.createCrimeForm.create.addEventListener('click', function(event) {
		event.preventDefault();
		let newCrime = {};
		let crName = document.createCrimeForm.crimeName.value;
		let nborhood = document.createCrimeForm.neighborhood.value;

		newCrime.crimeName = crName;
		newCrime.neighborhood = nborhood;
		if (newCrime) {
			postCrime(newCrime);
			newCrime = {};
		}
	})
}

function getCrimes() {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/crimes/');

	xhr.onreadystatechange = function() {
		// If status is below error range, and readyState is 4 (DONE)
		if (xhr.readyState === 4 && xhr.status < 400) {
			var crimes = JSON.parse(xhr.responseText);
			console.log(crimes);
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

function getCrime(crimeId) {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/crimes/' + crimeId);

	xhr.onreadystatechange = function() {
		// If status is below error range, and readyState is 4 (DONE)
		if (xhr.readyState === 4 && xhr.status < 400) {
			var crime = JSON.parse(xhr.responseText);
			console.log(crime);
			displayCrime(crime);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.log(xhr.status + ': ' + xhr.responseText);
			let crimeData = document.getElementById('crimeData');
			crimeData.textContent = "Crime not found";

		}
	};

	xhr.send(null);
}

function displayCrime(crime) {
	let crimeDiv = document.getElementById('crimeData');
	crimeDiv.textContent = '';

	let h2Title = document.createElement('h2');
	h2Title.textContent = crime.crimeName;
	crimeDiv.appendChild(h2Title);

	let neighborhood = document.createElement('p');
	neighborhood.textContent = crime.neighborhood;
	crimeDiv.appendChild(neighborhood);

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

	allCrimes.forEach(function(value, index, array) {

		let tbodyRow = document.createElement('tr');

		let tbodyData1 = document.createElement('td');
		let tbodyData2 = document.createElement('td');
		let tbodyData3 = document.createElement('td');

		tbodyData1.textContent = value.id;
		tbodyRow.appendChild(tbodyData1);
		

		tbodyData2.textContent = value.crimeName;
		tbodyData2.addEventListener('click', function(e){
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

function crimeDetail(crime){
	console.log("in crime detail");
	console.log("id: " + crime.id);
	console.log("crime: " + crime.crimeName);
	console.log("neighborhood: " + crime.neighborhood);
	
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
	
	btnBack.addEventListener('click', function(e){
		singleCrimeData.textContent = '';
	});
	
	btnEdit.addEventListener('click',function(e){
		editCrime(crime);
	});
	
	// append the buttons to the crime detail
	singleCrimeData.appendChild(btnBack);
	singleCrimeData.appendChild(btnEdit);

}

function editCrime(crimeObject){
	let editCrimeDataDiv = document.getElementById('editCrimeData');

	// create the form, give it a name
	var form = document.createElement('form');
	form.name = 'editForm';

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

		submit.addEventListener('click', function(e) { // Assign an event listener to the submit button variable

			e.preventDefault();
			var form = e.target.parentElement;
			console.log(form);
			
			// print the crimeNameInput value to the console

			console.log(form.crimeName.value);
			console.log(form.neighborhood.value);

			// clear the form data
			form.reset();
			editCrimeData.textContent = '';
		});
	form.appendChild(submit);
	editCrimeDataDiv.appendChild(form);	
}

function postCrime(crimeObject) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/crimes', true);

	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON
	// request body

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) { // Ok or Created
				var crime = JSON.parse(xhr.responseText);
				console.log(crime);
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
