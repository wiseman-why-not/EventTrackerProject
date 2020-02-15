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
		tbodyRow.appendChild(tbodyData2);

		tbodyData3.textContent = value.neighborhood;
		tbodyRow.appendChild(tbodyData3);

		tbody.appendChild(tbodyRow);
	});

	table.appendChild(tbody);
	crimeDiv.appendChild(table);

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
