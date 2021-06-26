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


async function getJSON(title){
  const response = await fetch("data.json");
  const result = await response.json();
  console.log(result.filter(i => i.title == title));
  return result.filter(i => i.title == title);
}

$(document).ready(function(){
  const searchParams = new URLSearchParams(window.location.search);
  const bookTitle = searchParams.get("bookURL").split("/").pop().replace(/_/g, " ");
  getJSON(bookTitle).then(result => generateBooks(result));
})
