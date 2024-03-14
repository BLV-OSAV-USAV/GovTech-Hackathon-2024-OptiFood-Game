function CallUser() {
    var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
    // Other requests
    // https://optifood.directus.app/items/QuizzQuestion?quiz=3
    // request.open('GET', 'https://optifood.directus.app/items/Challenges'); // 
    request.open('GET', 'https://optifood.directus.app/items/Score?fields=*.*.*.*'); 
    request.send();
/*  request.open('GET', 'https://optifood.directus.app/items/Friend'); 
    request.send(); */
    

    let usr_arr = {}; // Initialize an empty array outside the onload function

    request.onload = async function () {
        var data = JSON.parse(this.response);
        for (var j = 0; j < data.data.length; j++){
            let id =data.data[j].related_user.id;
            let usr = {
                id: data.data[j].related_user.id, 
                first_name: data.data[j].related_user.first_name,
                last_name: data.data[j].related_user.last_name,
                reached_score: data.data[j].reached_score
            };
            if(usr_arr[id]==undefined)
                usr_arr[id]=usr;
            else{
                usr_arr[id].reached_score= usr_arr[id].reached_score+usr.reached_score;
            }

        }
        usr_arr2 =[];
        for (var user in usr_arr) {
            usr_arr2.push(usr_arr[user]);
        };
        // Sort users array by reached_score in descending order
        usr_arr2.sort((a, b) => b.reached_score - a.reached_score);
    
        let html = '<table>';
    
        usr_arr2.forEach((user, i) => { // Use forEach to iterate over usr_arr
            html += `
                <tr>
                    <td class="number">${i + 1}</td>
                    <td class="name">${user.first_name} ${user.last_name}</td>
                    <td class="points">${i === 0 ? user.reached_score + '<img class="gold-medal" src="https://github.com/malunaridev/Challenges-iCodeThis/blob/master/4-leaderboard/assets/gold-medal.png?raw=true" alt="gold medal"/>' : user.reached_score}</td>
                </tr>
            `;
        });        
    
        html += '</table>';
        

        userId = getUserData().id;

        document.getElementById('wlcUsr').innerHTML = 'Welcome back '+ '<i>' + usr_arr[userId].first_name + '</i>';
        document.getElementById('ranking').innerHTML = html;

    };
}


userID = getUserData();
if(userID!=false){
    CallUser()
}else{
    window.location="login.html"
}