async function getData() {
    const data = await fetch("https://opentdb.com/api.php?amount=10")
    .then((res) =>{
        return res.json();


    }).catch((err)=>{
            console.log(data);
    })

  
    console.log(data);
}
getData()