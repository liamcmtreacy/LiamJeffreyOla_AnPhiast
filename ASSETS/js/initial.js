if(typeof(Storage) !== "undefined") {
    // console.log("Local storage is supported.");
    // Local storage is available on your browser
    const username = localStorage.getItem('username');
    const score = localStorage.getItem('score');
    if (username){
        let form = document.forms["helloForm"];
        form.style.display = "none";
        let modal = document.getElementById("modal");
        let modalContent = modal.children[0].children[2];
        modal.style.display = "block";
        modalContent.innerHTML = "username: " + username + "<br>" + "score: " + score;
        let header = document.getElementById("main-header");
        header.innerHTML = "Hello " + username;
        let validateButton = document.getElementsByClassName("saved-data-accept")[0];
        let dismissButton = document.getElementsByClassName("saved-data-refusal")[0];
        validateButton.onclick = function(){
            window.location.href = "gameplay.html";
        }
        dismissButton.onclick = function(){
            modal.style.display = "none";
            form.style.display = "block";
        
            localStorage.clear();
        }
    }
    else{
        console.log("no data in localStorage, loading new session")
    }
  } else {
    console.log("Local storage is not supported.");
    // The condition isn't met, meaning local storage isn't supported
  }