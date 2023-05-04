import { useState, useEffect, useRef } from "react";
import styles from "@/styles/components/all_question.module.css";
import Rating from "@mui/material/Rating";

export default function DetailsQuestion ({
  questionobj,
  questionCounter,
  Data,
  progressValue,
  setProgressValue,
  setQuestionCounter,
}) {
  let [newSet, setNewSet] = useState([]);
  let [showStatus, setShowStatus] = useState("");
  let [showPercantage, setShowPercantage]=useState(0);
  console.log(questionobj);
  
  let { difficulty, category, question, incorrect_answers, correct_answer } =
    questionobj;


    let refvalue=useRef(null);

    // clear the duplicate elements from an array and do the suffle on every question
  useEffect(() => {
    if (incorrect_answers) {
      console.log(incorrect_answers);
      incorrect_answers.push(correct_answer);
      let respon = incorrect_answers.filter(
        (item, index) => incorrect_answers.indexOf(item) === index
      );
      let suffleArray = respon.sort(() => Math.random() - 0.5);
      setNewSet(suffleArray);
    }
  }, [questionCounter, questionobj, incorrect_answers, correct_answer]);
  // let lis=document.querySelectorAll(".options");
  // console.log(lis);

// Get Result and select option functionality
  const getResultValue = (resp, id) => {
    let lis=document.querySelectorAll(".options");
    console.log(lis);
  
    console.log(resp, id);
    if (correct_answer == resp) {
      console.log(resp, id);      
      setShowStatus("Correct!");
      setShowPercantage(showPercantage+5)
     lis[id].style.backgroundColor="black";
     lis[id].style.color="white";
    } else {
      setShowStatus("Sorry!");
      lis[id].style.border="2px solid black";
      lis.forEach((value, ind) =>{
      if(decodeURIComponent(correct_answer) == value.innerHTML){
        // console.log(correct_answer == value.innerHTML);
        lis[ind].style.backgroundColor="black";
        lis[ind].style.color="white"
      }
    })
    }
  };
  useEffect(() =>{
    if (refvalue.current) {
        refvalue.current.style.width = `${showPercantage}%`;
      }
  },[showPercantage])
//   next Question Button Functionality
  const nextQuestionFunc = () => {
    let lis=document.querySelectorAll(".options");
    console.log(lis);
  
    if(questionCounter >= Data.length){
        window.location.reload()
    };
    setProgressValue(progressValue + 1);
    setQuestionCounter(questionCounter + 1);
    setShowStatus("");
    lis.forEach((value) =>{
        // console.log(value);
        value.removeAttribute("style")
    });
  };
  return (
    <div className={styles.question_section}>
      <h1 className="text-4xl">
        Question: {questionCounter} of {Data.length}
      </h1>
      <div className={styles.ind_question}>
        <p className="py-1">{category && decodeURIComponent(category)}</p>
        {difficulty == "hard" ? (
          <Rating name="read-only" value={3} readOnly />
        ) : difficulty == "medium" ? (
          <Rating name="read-only" value={2} readOnly />
        ) : difficulty == "easy" ? (
          <Rating name="read-only" value={1} readOnly />
        ) : null}
        <div className={styles.ques_ans_section}>
          <p className="py-1 text-xl font-semibold">
            {question && decodeURIComponent(question)}
          </p>
          <div className={styles.option}>
            {newSet && (
              <ul>
                {newSet.map((value, id) => {
                //   console.log(value);
                  return (
                    <li key={id} className="options" onClick={() => getResultValue(value, id)}>
                      {value && decodeURIComponent(value)}
                    </li>
                  );
                })}
              </ul>
            )}
            {showStatus && (
            <p className="py-4 text-4xl text-center">
            {showStatus}
          </p>
            )}

          </div>
        </div>
        <div className={`flex justify-center items-center mx-auto ${styles.next_question_btn}`}>
        <button onClick={nextQuestionFunc} disabled={showStatus == ""}>Next Question</button>
        </div>
      {/* score section */}
      <div className={`${styles.scores_Section}`}>
        
        <div className="flex justify-between items-center">
         <span>Score: {showPercantage && showPercantage}</span>
         </div>
         <div className={`${styles.nested_scores_Section}`}>
         <div className={styles.score_point} ref={refvalue}>
       </div>
        </div>
      </div>
      </div>

    </div>
  );
};
