async function CallMe() {
    var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
    // Other requests
    // https://optifood.directus.app/items/QuizzQuestion?quiz=3
    // request.open('GET', 'https://optifood.directus.app/items/Challenges'); // 

    const url = 'https://optifood.directus.app/items/QuizzQuestion?';


    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const text = await response.text();
    responseJson= JSON.parse(text).data


    let questions_from_be = new Array();
    
    

       
    var data =JSON.parse(text)        ;
    for (var j = 0; j < data.data.length; j++){
        debugger;
        let question = {
            lesson_learned:data.data[j].lesson_learned,
            numb:  j,
            question:  data.data[j].Question,

            answer: data.data[j]["answer_"+(parseInt(data.data[j].corrected_answer)+1)],
            options: [
                data.data[j].answer_1,
                data.data[j].answer_2,
                data.data[j].answer_3,
                data.data[j].answer_4,
            ]
        }
        questions_from_be.push(question);
    }
    

    questions= questions_from_be
    startGame();


}
let questions ;
CallMe();
