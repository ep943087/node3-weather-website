

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
search.select();
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    message1.textContent = "Loading...";
    message2.textContent = "";
    fetch('weather?address='+search.value).then(response=>{
        response.json().then(data=>{
            if(data.error){
                message1.textContent = message2.textContent ="";
                return message1.textContent = (data.error + " \"" + search.value + "\""); 
            }
            message1.textContent = data.location;
            message2.textContent = data.forecast;
        })
    })
})