var database;
var contentInput;
var shareButton;

function setup() {
	
	contentInput = createInput("Paste HTML content here");
	contentInput.parent('post');
	
	shareButton = createButton("Share it!");
	shareButton.parent('post');
	shareButton.mousePressed(shareContent);
	
	var config = {
    apiKey: "AIzaSyDu4AT0Ufny7d9RCokjpVYQz8oYODuP7h8",
    authDomain: "websites-f04b3.firebaseapp.com",
    databaseURL: "https://websites-f04b3.firebaseio.com",
    projectId: "websites-f04b3",
    storageBucket: "websites-f04b3.appspot.com",
    messagingSenderId: "461438271430"
    };
	
  firebase.initializeApp(config);
  database = firebase.database();
  
  var params = getURLParams();
  if (params.id) {
    getSite(params.id);
  }
  else
  {
	  var ref = database.ref('sites');
	  ref.on('value', gotData, errData);
  }
}

function gotData(data) {

  var sitelistings = selectAll('.sitelisting');
  for (var i = 0; i < sitelistings.length; i++) {
    sitelistings[i].remove();
  }

  var sites = data.val();
  var keys = Object.keys(sites);
  for (var i = keys.length - 1; i >= 0; i--) {
    var k = keys[i];
    var c = sites[k].content;
    var li = createElement('li', '');
	var ahref = createA('?id=' + k, k);
    ahref.mousePressed(getSite);
    ahref.parent(li);
	
    li.class('sitelisting');
    li.parent('sitelist');
  }
}

function errData(err) {
  console.log('Error!');
  console.log(err);
}


function shareContent() {
	
	if (contentInput.value() != "Paste HTML content here")
	{
		var ref = database.ref('sites');
	  
		var data = {
			content: contentInput.value()
		}
		ref.push(data);
		
		contentInput.value("Paste HTML content here");
	}
}

function getSite(k) {
	
	var ref = database.ref('sites/' + k);
	ref.once('value', oneSite, errData);
}

function oneSite(data)
{
	var dbsite = data.val();
	//document.body.innerHTML = dbsite.content;
	document.write(dbsite.content);
}