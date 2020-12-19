import './App.css';
import { useState , useRef } from "react";
import { quizData } from "./quizData";
const randomData = [...quizData].sort(()=> Math.random() - .5);
function App() {
  let context = useRef(null);
  const [ answersArray , setAnswerArray]  = useState([]);
  let [correctLength , setCorrectLength] = useState();


  let [data , setData] = useState(randomData);

  function buttonOnClick (anw , obj , evt) {
    if(!(
      answersArray.find(info => {
        return info.id === obj.id;
      })
      )){
        evt.currentTarget.classList.add("btn-checked");
        setAnswerArray([...answersArray , {"correct" : (anw.correct) , "id" : (obj.id) } ]); 
      };
    }
    
    //  fetch(`https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`)
    //   .then(function (response) {
    //     return response.json()
    //   }).then(function (data){
    //     console.log(data.results)
    //   })
    
    return (
      <div className="container">
      <div className="context" ref={context}>
      {
        data.length > 0 && data.map((obj , idx) => {
          return (
            <div key={obj.id}>
            <p>{idx+1}. {obj.question}</p>
            <div className="button-box">
            {
              obj.answers.map((anw , idx) => {
                return (
                  <button key={idx} className="button" onClick={
                    e => {
                      buttonOnClick(anw , obj , e);
                    }
                  }><span>{anw.answer}</span></button>
                  );
                })
              }
              </div>
              </div>
              )
            })}
            
            </div>
            <div className="result-box">
            <button className="result-btn" onClick={
              e => {
                setData([]);
                document.body.classList.add("modal");
                setCorrectLength(answersArray.filter(obj => {
                  return obj.correct; 
                }).length);
              }
            }>Result</button>
            <button className="rerty-btn" onClick={
              e => {
                setAnswerArray([]);
                document.querySelectorAll(".button").forEach(btn => {
                  btn.classList.remove("btn-checked")
                });
                setCorrectLength(undefined);
                document.body.classList.remove("modal");
                setData(randomData.sort(()=> Math.random() - .5));
              }
            }>Rerty</button>
            {
              !isNaN(correctLength) && <p className="result-text">
              {
                Math.ceil(correctLength / quizData.length * 100) + "%"
              }
              </p>
              
            }
            </div>
            </div>
            );
          }
          
          export default App;
          