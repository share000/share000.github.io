var database;
var contentInput;
var shareButton;
var explorer;
var sites;

function setup() {
	
	explorer = 1;
	
	var info0 = createP("Tytuł (musi mieć dokładnie 8 znaków):");
	info0.parent('post');
	
	titleInput = createInput("przykład");
	titleInput.parent('post');
	
	var info1 = createP("Tekst:");
	info1.parent('post');
	
	contentInput = createInput("Tutaj wpisz tekst");
	contentInput.parent('post');
	
	var info2 = createP("Kolor tekstu (po angielsku):");
	info2.parent('post');
	
	colorInput = createInput("Blue");
	colorInput.parent('post');
	
	var info3 = createP("Wielkość tekstu:");
	info3.parent('post');
	
	sizeInput = createSlider(0, 1000, 100);
	sizeInput.parent('post');
	
	var info4= createP("Link do obrazka w tle:");
	info4.parent('post');
	
	imgInput = createInput("");
	imgInput.parent('post');
	
	shareButton = createButton("Opublikuj!");
	shareButton.parent('post');
	shareButton.mousePressed(shareContent);
	
	var info5= createP("Strony opublikowane przez użytkowników:");
	info5.parent('post');
	
	var backb = createButton("<");
	backb.parent('post');
	backb.mousePressed(back);
	
	var forwb = createButton(">");
	forwb.parent('post');
	forwb.mousePressed(forw);
	
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

function back()	{
	if (explorer > 1)
	{
		explorer--;
		arrowExplore();
	}
}

function forw()	{
	explorer++;
	arrowExplore();
}

function gotData(data) {

  var sitelistings = selectAll('.sitelisting');
  for (var i = 0; i < sitelistings.length; i++) {
    sitelistings[i].remove();
  }

  sites = data.val();
  var keys = Object.keys(sites);
  for (var i = keys.length - 1 - (15 * (explorer-1)); i >= keys.length - (15 * explorer); i--) {
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

function arrowExplore() {
	var sitelistings = selectAll('.sitelisting');
  for (var i = 0; i < sitelistings.length; i++) {
    sitelistings[i].remove();
  }
    var keys = Object.keys(sites);
   for (var i = keys.length - 1 - (15 * (explorer-1)); i >= keys.length - (15 * explorer); i--) {
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
	
	if (contentInput.value() != "Tutaj wpisz tekst" && titleInput.value().length == 8)
	{
		var ref = database.ref('sites');
	  
		var data = {
			content: "<html><head><title>" + titleInput.value() + "</title> 		<style> 			h1 { text-align: center; color: " + colorInput.value() + "; font-size: " + sizeInput.value() + "%;} 		</style> 	</head><body background= " + imgInput.value() + "> 	 	 		<h1>" + contentInput.value() + "</h1> 	 </body></html>"
		}
		ref.push(data);
		
		contentInput.value("Tutaj wpisz tekst");
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