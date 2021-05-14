async function addCats(name, age) {
    try{
        var data = {
            name: name.trim(), 
            age: parseInt(age, 10)
        };

        if(data.name==""||data.name==null){
            response = {message:"Please enter a name", success: false};
            return(response);
        }
        console.log(data.age);
        if(!Number.isInteger(data.age)){
            response = {message:"Age needs to be a valid number", success: false};
            return(response);
        }else if(data.age < 0){
            response = {message: "Age needs to be a positive number", success: false};
            return(response);
        }
        console.log(data);
        var response = await fetch('/cats', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      
                      body: JSON.stringify(data)
                      
                    });
        response = {message:'Cat '+data.name+' created succesfully', success: true};
        return response;
    }catch(err){
        alert(err);
    }
}


$("#add_cat").click((e)=>{
    e.preventDefault();
    var name = $('#catName').val();
    var age = $('#catAge').val();

    console.log('button pressed');
    addCats(name, age).then((cats)=>{
        $('#responseModal').modal('show');
        $('#messages_content').html('<p>'+cats.message+'</p>');
    });

});

$("#return_home").click(() => {
    location.href = "/";
});