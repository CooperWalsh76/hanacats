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

//call function to get all the cats, then append those cats the table, this is triggered by the JQuery on click event 
$( "#list_btn" ).click(function() {
  getCats().then((cats)=>{
      console.log(cats);
      cats.forEach((cat)=>{
          $('#cats_table > tbody:first').append('<tr><td scope="row">'+cat.CAT_ID+'</td><td>'+cat.NAME+'</td><td>'+cat.AGE+'</td></tr>');
      })
      $(this).prop('disabled', true);
  });
});

