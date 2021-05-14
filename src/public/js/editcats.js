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

//update the cat based on the fields given in the input boxes
async function updateCats(id, name, age){
    
    //populate array of data to send in message body and check it is valid
    try{
        var data = {
            name: name.trim(), 
            age: parseInt(age, 10)
        };

        if(data.name==""||data.name==null){
            response = "Please enter a name";
            return(response);
        }
        console.log(data.age);
        if(!Number.isInteger(data.age)){
            response = "Age needs to be a valid number";
            return(response);
        }else if(data.age < 0){
            response = "Age needs to be a positive number";
            return(response);
        }
        console.log(data);
        var response = await fetch('/cats/'+id, {
                      method: 'PATCH',
                      headers: {
                        'Content-Type': 'application/json',
                      },

                      body: JSON.stringify(data)
                      
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
        $('#cat-select-name').val(cat.NAME);
        $('#cat-select-age').val(cat.AGE);
    });
});


$("#update_cat").click((e)=>{
    e.preventDefault();
    var id = parseInt($("#cat-select").val(),10);
    var name = $("#cat-select-name").val();
    var age = parseInt($("#cat-select-age").val(),10);
    
    console.log('button pressed');
    updateCats(id,name,age).then((response)=>{
        $('#responseModal').modal('show');
        $('#messages_content').html('<p>'+response+'</p>');
    });

});


    

$("#return_home").click(() => {
    location.href = "/";
});