document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('message').innerHTML = 'NO DATA';
  chrome.storage.local.get({elements: []}, function(items) {
    document.getElementById('message').innerHTML = 'Received Data';
    document.getElementById('data').innerHTML = items.elements[0].innerHTML;
  });
});

window.onload = function() {
  console.log("onload" + Date());

  chrome.storage.local.get('elements', function(items) {
    console.log(items.elements);
    document.getElementById('message').innerHTML = 'Received Data ON LOAD';
    for (var i = 0; i < items.elements.length; i++) {
      document.getElementById('data').innerHTML += items.elements[i] + "|";
    }
  });


  chrome.storage.local.get('somestring', function(items) {
    console.log(items.somestring);
  });

};