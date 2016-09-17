var airportCodeMap = 
{
	'Agartala':	'IXA',
	'Agra':	'AGR',
	'Ahmedabad':	'AMD',
	'Allahabad':	'IXD',
	'Amritsar':	'ATQ',
	'Aurangabad':	'IXU',
	'Bagdogra':	'IXB',
	'Bangalore':	'BLR',
	'Bhavnagar':	'BHU',
	'Bhopal':	'BHO',
	'Bhubaneswar':	'BBI',
	'Bhuj':	'BHJ',
	'Kolkata':	'CCU',
	'Chandigarh':	'IXC',
	'Chennai':	'MAA',
	'Cochin':	'COK',
	'Coimbatore':	'CJB',
	'Daman':	'NMB',
	'Dehradun':	'DED',
	'Dibrugarh':	'DIB',
	'Dimapur':	'DMU',
	'Diu':	'DIU',
	'Gauhati':	'GAU',
	'Goa':	'GOI',
	'Gwalior':	'GWL',
	'Hubli':	'HBX',
	'Hyderabad':	'HYD',
	'Imphal':	'IMF',
	'Indore':	'IDR',
	'Jaipur':	'JAI',
	'Jammu':	'IXJ',
	'Jamnagar':	'JGA',
	'Jamshedpur':	'IXW',
	'Jodhpur':	'JDH',
	'Jorhat':	'JRH',
	'Kanpur':	'KNU',
	'Khajuraho':	'HJR',
	'Kozhikode':	'CCJ',
	'Leh':	'IXL',
	'Lucknow':	'LKO',
	'Ludhiana':	'LUH',
	'Madurai':	'IXM',
	'Mangalore':	'IXE',
	'Mumbai':	'BOM',
	'Nagpur':	'NAG',
	'Nanded':	'NDC',
	'Nasik':	'ISK',
	'New Delhi':	'DEL',
	'Patna':	'PAT',
	'Pondicherry':	'PNY',
	'Pune':	'PNQ',
	'Porbandar':	'PBD',
	'Port Blair':	'IXZ',
	'Puttaparthi':	'PUT',
	'Rae Bareli':	'BEK',
	'Rajkot':	'RAJ',
	'Ranchi':	'IXR',
	'Shillong':	'SHL',
	'Silchar':	'IXS',
	'Srinagar':	'SXR',
	'Surat':	'STV',
	'Tezpur':	'TEZ',
	'Tiruchirapally':	'TRZ',
	'Tirupati':	'TIR',
	'Trivandrum':	'TRV',
	'Udaipur':	'UDR',
	'Vadodara'	:'BDQ',
	'Varanasi':	'VNS',
	'Vijayawada':	'VGA',
	'Vishakhapatnam':	'VTZ'
};

var handleFlightNumberClick = function(event) {
	console.log(event);
	console.log(event.path[0].innerText);
	var previousDivs = event.path[3].getElementsByClassName('flight-details-div');
	if (previousDivs.length === 0) {
		event.path[3].innerHTML += '<div id = "flight-delay-details" class = "flight-details-div" style = "height: 40px;">LOADING FLIGHT DELAYS</div>';
		var cities = event.path[3].getElementsByClassName('city_name');
		var fromCity = null;
		var toCity = null;
		for (var i = 0; i < cities.length; i++) {
    		if (airportCodeMap[cities[i].innerHTML]) {
    			if (!fromCity) {
    				fromCity = airportCodeMap[cities[i].innerHTML];
    			} else {
    				toCity = airportCodeMap[cities[i].innerHTML];
    			}
    		}
    	}

		chrome.runtime.sendMessage({flightDetails: event.path[0].innerText, fromCity: fromCity, toCity: toCity}, function(response) {
			console.log(response);

			var loadingDiv = event.path[3].getElementsByClassName('flight-details-div');
			if (loadingDiv.length !== 0) {
				event.path[3].removeChild(loadingDiv[0]);
			}
			event.path[3].innerHTML += '<div id = "flight-delay-details" class = "flight-details-div">'+response.details+'</div>';
		});
	}
};

var updateMouseOverListeners = function() {
	var elements = document.getElementsByClassName('flt_number');
	var elements600 = document.getElementsByClassName('flt_number_less600');
	
	var elestring = [];
	
	for(var i = 0; i < elements.length; i++) {
		elestring.push(elements[i].innerHTML);

		elements[i].addEventListener("mouseover", handleFlightNumberClick);
	}

	for(var i = 0; i < elements600.length; i++) {

		elements600[i].addEventListener("mouseover", handleFlightNumberClick);
	}
	setTimeout(updateMouseOverListeners, 1000);
}

updateMouseOverListeners();