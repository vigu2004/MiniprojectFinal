const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");

    console.log(window.location);
   
    fetch(`${window.location.origin}/login`,  { method: 'POST', headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({username: document.getElementById("name").value, password: document.getElementById("password").value}), })
    .then(res => res.json())
    .then(res => console.log('res', res))
    .catch(err => console.log('error', err))
});