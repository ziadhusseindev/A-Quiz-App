import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (ans === question.ans) {
        e.target.classList.add("Correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("Wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("Correct");
      }
    }
  };

  const next = () => {
    if (lock === true) {
      if (index + 1 === data.length) {
        setResult(true);
        return 0;
      }
      setLock(false);
      setIndex(index + 1);
      setQuestion(data[index + 1]);
      option_array.map((option) =>{
      option.current.classList.remove("Correct", "Wrong")
      return null
    });
    }
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result?<></>:<><h2>{index + 1}. {question.question}</h2>
      <ul>
        <li ref={Option1} onClick={(e) => {checkAns(e, 1);}}>{question.option1}</li>
        <li ref={Option2} onClick={(e) => {checkAns(e, 2);}}>{question.option2}</li>
        <li ref={Option3} onClick={(e) => {checkAns(e, 3);}}>{question.option3}</li>
        <li ref={Option4} onClick={(e) => {checkAns(e, 4);}}>{question.option4}</li>
      </ul>
      <button onClick={next}>Next</button>
      <div className="index"> {index + 1} of {data.length} Questions </div></>}
      {result?<><h2>You Scored: {score} out of {data.length}</h2>
      <button onClick={() => window.location.reload()}>Restart</button>
      </>:<></>}
      
    </div>
  );
};

export default Quiz;
