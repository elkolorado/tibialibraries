var spacedata;
var surowy;
var tytul;
var firstvariable = '<blockquote class="book"><p><br />';
var secondvariable = '</p></blockquote>';
var calosc;
var wikialink;
var wikia = 'http://tibia.wikia.com/api.php?format=json&prop=text&action=parse&pageid=';


// create title, url and txt from book
var teksty = [];
function gotData(data) {
    spacedata = data;
    surowy = spacedata.parse.text["*"];

    someText = surowy.replace(/\r?\n|\r/g, "");

    testRE = someText.match(new RegExp(firstvariable + "(.*)" + secondvariable));

    calosc = testRE[1].replace(/ <[^>]+>\s+(?=<)|<[^>]+>/ug, " ");
    tytul = spacedata.parse.title;
    tytuly = 'http://tibia.wikia.com/wiki/' + tytul;
    wikialink = tytuly.replace(/\s/g, "_");
    teksty.push({
        title: tytul,
        url: wikialink,
        txt: calosc,
    });
}


// loop through all books
function allBook() {
    for (var i = 0; i <= url2.length; i++) {
        loadJSON(url2[i], gotData, 'jsonp');
    }
}


// create link to api for each book while using id
var url2 = [];
function setup() {
    noCanvas();
    for (var i = 0; i < spacedata2.items.length; i++) {
        url2.push(wikia + spacedata2.items[i].id);
            }
}


// below helper for data
function gotData2(data2) {
    spacedata2 = data2;
}

// load book ids
var allbooksurl = 'https://tibia.fandom.com/api/v1/Articles/List?expand=0&format=json&category=Book_Texts&limit=90000';
function preload() {
    txt = loadJSON(allbooksurl, gotData2);
}
