$(document).ready(function(){

let mapData = []
async function getMap(url){
    let request = await fetch('/tibialibraries/locate/' + url);
    let response = await request.text()
    return response.split('\n')
}

async function getIds(url){
  let request = await fetch('/tibialibraries/locate/' + url);
  let response = await request.json()
  return response
}

function findInMap(id){
  let currentURL = window.location.protocol + "//" + window.location.host + window.location.pathname + `?id=${id}`;    
  window.history.pushState({ path: currentURL }, '', currentURL);

  $('#location').html('')

  let found = []
  mapData.forEach(line => {
    line.split('Content={')[1]?.includes(id) && found.push(line.split(':')[0]) 
  })
  if (found.length > 40){
    alert(`This item is common, it exist more than 40 times. For now this functionality is disabled, but will be resolved in future with padding. Please find other item that exist in lesser quantity. \n\nLocations of that item has been copied to your clipboard.`)
    navigator.clipboard.writeText(found.join('\n'))
  } else {
    found.forEach(item => {
      let location = `<div class="col"><iframe src="https://tibiamaps.io/map/embed#${item}:1" style="width: 1000px; height: 500px;"></div>`;
      $('#location').append(location);
    })
  }

}

getMap('file.txt').then(res => {
  mapData = res;
})

getIds('objects.json').then(res => {
  res.forEach(id => {
    $('#ids').append(`<option value='${id.name}' data-id='${id.id}'>${id.name}</option>`)
  })

  const params = new URLSearchParams(window.location.search)
  if(params.has('id')){
    $("input[name=ids]").val($('#ids [data-id="' + params.get('id') + '"]').val())
  }
  findInMap(params.get('id'))

})


$("input[name=ids]").on('input', function() {
  let value = $(this).val();
  let selectedItemId = $('#ids [value="' + value + '"]').data('id');
  findInMap(selectedItemId)
});

})
