var database;
var contentInput;
var shareButton;

function setup() {
	
	var info0 = createP("Title (exactly 8 characters):");
	info0.parent('post');
	
	titleInput = createInput("sample!!");
	titleInput.parent('post');
	
	var info1 = createP("Text:");
	info1.parent('post');
	
	contentInput = createInput("Here type the text");
	contentInput.parent('post');
	
	var info2 = createP("Text color:");
	info2.parent('post');
	
	colorInput = createInput("Blue");
	colorInput.parent('post');
	
	var info3 = createP("Text size:");
	info3.parent('post');
	
	sizeInput = createSlider(0, 1000, 100);
	sizeInput.parent('post');
	
	var info4= createP("Image link here:");
	info4.parent('post');
	
	imgInput = createInput("");
	imgInput.parent('post');
	
	shareButton = createButton("Share it!");
	shareButton.parent('post');
	shareButton.mousePressed(shareContent);
	
	var info5= createP("Latest published websites:");
	info5.parent('post');
	
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
  for (var i = keys.length - 1; i >= keys.length - 15; i--) {
    var k = keys[i];
    var c = sites[k].content;
    var li = createElement('li', '');
	var ahref = createA('?id=' + k, c.substr(19, 26) );
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
	
	if (contentInput.value() != "Here type the text" && titleInput.value().length == 8)
	{
		var ref = database.ref('sites');
	  
		var data = {
			content: "<html><head><title>" + titleInput.value() + "</title> 		<style> 			h1 { text-align: center; color: " + colorInput.value() + "; font-size: " + sizeInput.value() + "%;} 		</style> 	</head><body background= " + imgInput.value() + "> 	 	 		<h1>" + contentInput.value() + "</h1> 	 </body></html>"
		}
		ref.push(data);
		
		contentInput.value("Here type the text");
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