//call server to get all the cats
async function getCats() {
    try{
        cats = await fetch('/cats');
        cats = await cats.json();
        return cats;
    }catch(err){
        console.log(err);
    }
    
    
};

//get cat by ID
async function getCatsByID(id) {
    try{
        cats = await fetch('/cats/'+id);
        cats = await cats.json();
        return cats;
    }catch(err){
        console.log(err);
    } 
};

async function deleteCats(id){
    try{
        var response = await fetch('/cats/'+id, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                      }
                      
                    });
        response = await response.text();
        return response;
    }catch(err){
        console.log(err);
    }
    
}

//refresh the page after cat was deleted
function pageRefresh(){
    location.reload(true);
};

//call function to get all the cats on page load and add them to dropdown select 
$( document ).ready(()=>{
  getCats().then((cats)=>{
      console.log(cats);
      cats.forEach((cat)=>{
          $('#cat-select').append(new Option(cat.CAT_ID, cat.CAT_ID));
      })
  });
});


//call function to get the info of the cat selected 
$( "#cat-select" ).change(()=>{
    var id = parseInt($("#cat-select").val(),10);
    getCatsByID(id).then((cat)=>{
        console.log(cat);
        $('#cat-select-name').text(cat.NAME);
        $('#cat-select-age').text(cat.AGE);
    });
});


$("#delete_cat").click((e)=>{
    e.preventDefault();
    var id = parseInt($("#cat-select").val(),10);
    
    console.log('button pressed');
    deleteCats(id).then((response)=>{
        $('#responseModal').modal('show');
        $('#messages_content').html('<p>'+response+'</p>');
    });

});


    

$("#return_home").click(() => {
    location.href = "/";
});