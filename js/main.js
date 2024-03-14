function CallUser() {
    var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
    // Other requests
    // https://optifood.directus.app/items/QuizzQuestion?quiz=3
    // request.open('GET', 'https://optifood.directus.app/items/Challenges'); // 
    request.open('GET', 'https://optifood.directus.app/items/Score?fields=*.*.*.*'); 
    request.send();
/*     request.open('GET', 'https://optifood.directus.app/items/Friend'); 
    request.send(); */
    


    let usr_arr = new Array();
    
    request.onload = async function () {
        debugger;

       
        var data = JSON.parse(this.response);
        for (var j = 0; j < data.data.length; j++){
           
            debugger;

            let usr = {
                id: data.data[j].related_user.id, 
                first_name: data.data[j].related_user.first_name,
                last_name: data.data[j].related_user.last_name,
                reached_score: data.data[j].reached_score
            }
            usr_arr.push(usr);
        }
    }

    

    return usr_arr

}
let users = CallUser()

// Add event listeners to the buttons with context binding
document.getElementById('strtChallenge').addEventListener('click', function() {
    window.location.href = 'pages/quiz.html';
});