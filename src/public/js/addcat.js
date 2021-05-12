async function addCats() {
    try{
        var data = {name: "Kerry", age: 12};
        console.log(data);
        var response = await fetch('/cats', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      
                      body: JSON.stringify(data)
                      
                    });
        response = await response.text();
        return response;
    }catch(err){
        alert(err);
    }
}


$("#add_cat").click((e)=>{
    e.preventDefault();
    console.log('button pressed');
    addCats().then((cats)=>{
        console.log(cats);
    });
});