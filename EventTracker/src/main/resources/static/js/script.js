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
	//		displayFilm(crime);
	//		displayFilmsActors(film);
		}

		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.log(xhr.status + ': ' + xhr.responseText);
			let crimeData = document.getElementById('crimeData');
			crimeData.textContent = "Crime not found";

		}
	};

	xhr.send(null);
}
//
//let neighborhoods = document.crimeForm.listOfNeighborhoods
//
//
//var ul = document.createElement('ul');
//
//items.forEach(function(value, index, array) {
//// create a new list item;
//var li = document.createElement('li');
//
//// assign the value at the current position
//// in the array to the list item's text value
//li.textContent = value;
//
//// append the list item to the unordered list
//ul.appendChild(li);
//});
//
////append the entire unordered list to the body
//document.body.appendChild(ul);