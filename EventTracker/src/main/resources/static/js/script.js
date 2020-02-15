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
}

function getCrime(crimeId) {
	// TODO:
	// * Use XMLHttpRequest to perform a GET request to "api/films/"
	// with the filmId appended.
	// * On success, if a response was received parse the film data
	// and pass the film object to displayFilm().
	// * On failure, or if no response text was received, put "Film not found"
	// in the filmData div.
	var xhr = new XMLHttpRequest();

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
