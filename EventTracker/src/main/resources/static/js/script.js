window.addEventListener('load', function(e) {
	console.log('document loaded');
	init();
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
		if (newCrime){
			postCrime(newCrime);
		}
	})
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
	var crimeDiv = document.getElementById('crimeData');
	crimeDiv.textContent = '';

	let h2Title = document.createElement('h2');
	h2Title.textContent = crime.crimeName;
	crimeDiv.appendChild(h2Title);

	let neighborhood = document.createElement('p');
	neighborhood.textContent = crime.neighborhood;
	crimeDiv.appendChild(neighborhood);

}

function postCrime(crimeObject){
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/crimes', true);

	xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body

	xhr.onreadystatechange = function() {
	  if (xhr.readyState === 4 ) {
	    if ( xhr.status == 200 || xhr.status == 201 ) { // Ok or Created
	      var crime = JSON.parse(xhr.responseText);
	      console.log(crime);
	    }
	    else {
	      console.log("POST request failed.");
	      console.error(xhr.status + ': ' + xhr.responseText);
	    }
	  }
	};

	var userObjectJson = JSON.stringify(crimeObject); // Convert JS object to JSON string

	xhr.send(userObjectJson);
}



