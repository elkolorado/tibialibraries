//var str1 = "123123" //currenlty working on small string but target is 11120digit number string
var books_text;
$(document).ready(function(){
  books_text = $("#books").text();
})
var textfield;
var output;
var submit;
var slider;
var textfield;
var val2 = [];
  var val1 = [];
// function setup(){
//   textfield = {};
//   fetch("books.json").then(res => res.json()).then(json => textfield = json);
//   output = select('#output');
//   submit = select("#submit");
//   submit.mousePressed(newText(textfield.nospaces, 2));
// }

/** Function that count occurrences of a substring in a string;
 * @param {String} string               The string
 * @param {String} subString            The sub string to search for
 * @param {Boolean} [allowOverlapping]  Optional. (Default:false)
 *
 * @author Vitim.us https://gist.github.com/victornpb/7736865
 * @see Unit Test https://jsfiddle.net/Victornpb/5axuh96u/
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 */
function occurrences(string, subString, allowOverlapping) {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}



$(document).ready(function(){

  $('#submit').click(function(){
    console.log("clicked");
    getBooks().then(result => newText(result.spaces, checkValue($('#custom').val())));

  });

function checkValue(value){
  return isNaN(value) ? alert(value + "is not a number") : parseFloat(value);
}

$('#submit2').click(function(){
  console.log("clicked");
  getBooks().then(result => newText(result.nospaces, checkValue($('#custom').val())));
});





})

async function getBooks(){
  const response = await fetch("books.json");
  const result = await response.json();
  return result;
}



// var b = 2;
function newText(input, b) {
  var arr =[];
  var str1 = input;
//console.log(str1);
  for (n=0; n<=str1.length; n++){
    res = str1.substring(n, n+b);
arr[n]=res;
    // push();
  }

  // map each sequence to its index
  var map = {};
      for (var i = 0; i < arr.length; i++) {
      var element = arr[i];
      (map[element] || (map[element] = [])).push(i)

  }
  // look for duplicates
  for (var element in map) {
      if (map[element].length === 1) {
          delete map[element];
      }
  }

  // show duplicates indexs
  var ind = [];
  for (var value of Object.values(map)) {
          var pocz = value;

          for (i=0; i<pocz.length; i++){
            jeden = pocz[i];
            // append(ind, jeden);
            ind.push(jeden);

          }
  }
  //console.log(ind);


  // show duplicates value

  for (var key of Object.keys(map)) {
          var pocz2 = key;
          // append(val1, pocz2);
          val1.push(pocz2);
  }


  // make spaces between duplicates
  var indx2 = ind;
  val2 = val1;
  // for (i = indx2.length - 1; i >= 0; i--) {
  //   str1 = str1.replace(new RegExp('^.{' + (indx2[i] + b) + '}'), '$& ')
  //   str1 = str1.replace(new RegExp('^.{' + indx2[i] + '}'), '$& ')
    //console.log("spa "+str1);
  // }

//console.log("Search for "+b+"-digit sequences");
//console.log("Repeated sequences: "+val2); //show duplicates


// console.log("After: "+str1); //create spaced string
// console.log("Indeksy "+indx2) //show indexs
document.getElementById("out-dig").innerHTML = "Search for "+b+"-digit sequences";
// v



$("#out-dig").append(`</br><button id="highlightall">Highlight all matches (more results = longer)</button>`);
$('#output').html("");

val2.filter(i => !i.includes("n")).filter(i=>!i.includes("\\")).forEach(i => {
  $('#output').append(`<span class="markme ndigit" onclick="spanH(this)">${i}</span><span>, </span>`);
});


$('#highlightall').on("click", function(){

    var options = {"separateWordSearch": true, "diacritics": true};
    val2.forEach(i => $("#books").mark(i, options))
})
$('.markme').on("click", function(e) {



  var value = $(this).text().toLowerCase();

  var mark = function() {

    // Read the keyword
    var keyword = value;

    // Determine selected options
    var options = {"separateWordSearch": true, "diacritics": true};


    // Remove previous marked elements and mark
    // the new keyword inside the context
    $("#books").unmark({
      done: function() {
        $("#books").mark(keyword, options);
      }
    });


  };
  mark();

});
 // = val2.join(", ");
// console.log(Object.keys(map))
  // for (var element in map){
  //
  // //  console.log(arr1);
  // }
  //  createP(map);

}



function spanH(thisa){
  this2 = $(thisa);
  var regex = new RegExp( this2.text(), "g");
  console.log((books_text.match(regex) || []).length)
  $('.highlighted').removeClass();
  this2.addClass("highlighted");
}






















// later here i should be able to find duplicates, by that mean to find "12"
