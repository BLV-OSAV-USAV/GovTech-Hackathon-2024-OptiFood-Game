function CallMe() {
    var request = new XMLHttpRequest(); // Create a request variable and assign a new XMLHttpRequest object to it.
    // Other requests
    // https://optifood.directus.app/items/QuizzQuestion?quiz=3
    // request.open('GET', 'https://optifood.directus.app/items/Challenges'); // 
    request.open('GET', 'https://optifood.directus.app/items/QuizzQuestion?'); 
    request.send();

    let questions_from_be = new Array();
    
    request.onload = async function () {

       
        var data = JSON.parse(this.response);
        for (var j = 0; j < data.data.length; j++){
           
   
            let question = {
                numb:  j,
                question:  data.data[j].Question,
                answer: data.data[j]["answer_"+data.data[j].corrected_answer+1],
                options: [
                    data.data[j].answer_1,
                    data.data[j].answer_2,
                    data.data[j].answer_3,
                    data.data[j].answer_4,
                ]
            }
            questions_from_be.push(question);
        }
    }

    return questions_from_be

}
let questions = CallMe()

// creating an array and passing the number, questions, options, and answers
// let questions = [
//     {
//     numb: 1,
//     question: "What does HTML stand for?",
//     answer: "Hyper Text Markup Language",
//     options: [
//       "Hyper Text Preprocessor",
//       "Hyper Text Markup Language",
//       "Hyper Text Multiple Language",
//       "Hyper Tool Multi Language"
//     ]
//   },
//     {
//     numb: 2,
//     question: "What does CSS stand for?",
//     answer: "Cascading Style Sheet",
//     options: [
//       "Common Style Sheet",
//       "Colorful Style Sheet",
//       "Computer Style Sheet",
//       "Cascading Style Sheet"
//     ]
//   },
//     {
//     numb: 3,
//     question: "What does PHP stand for?",
//     answer: "Hypertext Preprocessor",
//     options: [
//       "Hypertext Preprocessor",
//       "Hypertext Programming",
//       "Hypertext Preprogramming",
//       "Hometext Preprocessor"
//     ]
//   },
//     {
//     numb: 4,
//     question: "What does SQL stand for?",
//     answer: "Structured Query Language",
//     options: [
//       "Stylish Question Language",
//       "Stylesheet Query Language",
//       "Statement Question Language",
//       "Structured Query Language"
//     ]
//   },
//     {
//     numb: 5,
//     question: "What does XML stand for?",
//     answer: "eXtensible Markup Language",
//     options: [
//       "eXtensible Markup Language",
//       "eXecutable Multiple Language",
//       "eXTra Multi-Program Language",
//       "eXamine Multiple Language"
//     ]
//   },
//   // you can uncomment the below codes and make duplicate as more as you want to add question
//   // but remember you need to give the numb value serialize like 1,2,3,5,6,7,8,9.....
//   //   {
//   //   numb: 6,
//   //   question: "Your Question is Here",
//   //   answer: "Correct answer of the question is here",
//   //   options: [
//   //     "Option 1",
//   //     "option 2",
//   //     "option 3",
//   //     "option 4"
//   //   ]
//   // },
// ];
