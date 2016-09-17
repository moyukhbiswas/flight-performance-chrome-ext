chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

  	var handleStateChange = function() {
		  
	if(this.readyState == 4 && this.status == 200) {
	    var parser = new DOMParser();
	    var doc = parser.parseFromString(this.responseText, "text/html");
	     
	    var response = doc.getElementsByClassName('uiComponent300')[0];

	    var imageURL = response.getElementsByTagName('img')[0].getAttribute('src');
	    response.getElementsByTagName('img')[0].src = "http://www.flightstats.com" + imageURL;

	    var unnecessaryHeader = response.childNodes[3].childNodes[1];
	    response.childNodes[3].removeChild(unnecessaryHeader);

	    var panels = response.getElementsByClassName('tabStatsPanel');
	    // if (panels.length >= 1) {
	    // 	var numberOfPanels = panels.length;
	    // 	for (var i = 1; i < numberOfPanels; i++) {
	    // 		panels[1].remove();	//Funny code here. Always remove panels[1] because the elements go missing :p
	    // 	}
	    // }

	    panels[0].style.width = '400px';
	    panels[0].style.display = 'inline-block';

	    panels[1].style.width = '250px';
	    panels[1].style.display = "inline-block";
	    panels[1].style.top = "-105px";
	    panels[1].style.position = "relative";

	    //Make the header smaller. since nothing except inline styles work here, well

	    response.getElementsByTagName('h2')[0].remove();
	    response.getElementsByTagName('hr')[0].remove();
		response.getElementsByTagName('hr')[0].remove();
	    sendResponse({details: response.innerHTML});
	   	}
  	};

  	var airline = request.flightDetails.substring(0,2);
  	var flightNumber = request.flightDetails.substring(3);
  	var xhr = new XMLHttpRequest();
  	xhr.onreadystatechange = handleStateChange;

  	var URL = 'http://www.flightstats.com/go/FlightRating/flightRatingByFlight.do?airline='+airline+'&flightNumber='+flightNumber;

  	if (request.fromCity && request.toCity) {
  		URL += '&departureAirportCode='+request.fromCity+'&arrivalAirportCode='+request.toCity;
  	}
  	xhr.open("GET", URL, true);
  	xhr.send();

  	return true;
});

