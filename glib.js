$.getJSON("data.json", function(json) {
generateBooks(json);
});
var tmp = '';
function generateBooks(data) {
  data.forEach(function(value, key){
    if (!value["url"].toLowerCase().includes('user:')) {
      var preremove = RegExp(/<pre>|<.pre>/gus);
      tmp += '<div class="col px-0 book"><div class="card"><div class="card-body"><h5 class="card-title"><a href="' + value["url"] + '" target="_blank" class="link">' + value["title"] + '</h5></a><div class="card-text">' + value["txt"].replace(preremove, "").replace('<p><br />', '<p>') + '</div></div></div></div>';
    }
  })
  $('#books').append(tmp);
}


$(document).ready(function(){
  $('.form-control').on("keypress", function(e) {
    if(e.which === 13) {


    var value = $(this).val().toLowerCase();
    $(".book").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });

    var mark = function() {

      // Read the keyword
      var keyword = value;

      // Determine selected options
      var options = {"separateWordSearch": true, "diacritics": true};


      // Remove previous marked elements and mark
      // the new keyword inside the context
      $(".book:visible").unmark({
        done: function() {
          $(".book:visible").mark(keyword, options);
        }
      });


    };
    mark();
          }
  });

});




  var mark = function() {

    // Read the keyword
    var keyword = $('.form-control').val();

    // Determine selected options
    var options = {"separateWordSearch": true, "diacritics": true};


    // Remove previous marked elements and mark
    // the new keyword inside the context
    $(".book").unmark({
      done: function() {
        $(".book").mark(keyword, options);
      }
    });


  };

  // $('.form-control').on("input", mark);
