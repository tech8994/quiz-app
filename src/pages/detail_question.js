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
//   console.log(questionobj);
  let [newSet, setNewSet] = useState([]);
  let [showStatus, setShowStatus] = useState("");
  let [showPercantage, setShowPercantage]=useState(0);
  // if(Data.length){
  //   let { difficulty, category, question, incorrect_answers, correct_answer } = questionobj;    
  // }



    let refvalue=useRef(null);

    // clear the duplicate elements from an array and do the suffle on every question
  useEffect(() => {
    if (questionobj.incorrect_answers) {
      questionobj.incorrect_answers.push(questionobj.correct_answer);
      let respon = questionobj.incorrect_answers.filter(
        (item, index) => questionobj.incorrect_answers.indexOf(item) === index
      );
      let suffleArray = respon.sort(() => Math.random() - 0.5);
      setNewSet(suffleArray);
    }
  }, [questionCounter, questionobj]);
  let lis=document.querySelectorAll(".options");
//   console.log(lis);

// Get Result and select option functionality
  const getResultValue = (resp, id) => {
    if (questionobj.correct_answer == resp) {
      setShowStatus("Correct!");
     lis[id].style.backgroundColor="black";
     lis[id].style.color="white";
     setShowPercantage(showPercantage+5)
    } else {
      setShowStatus("Sorry!");
      lis[id].style.border="2px solid black";
      lis.forEach((value, ind) =>{
      if(decodeURIComponent(questionobj.correct_answer) == value.innerHTML){
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
        <p className="py-1">{questionobj.category && decodeURIComponent(questionobj.category)}</p>
        {questionobj.difficulty == "hard" ? (
          <Rating name="read-only" value={3} readOnly />
        ) : questionobj.difficulty == "medium" ? (
          <Rating name="read-only" value={2} readOnly />
        ) : questionobj.difficulty == "easy" ? (
          <Rating name="read-only" value={1} readOnly />
        ) : null}
        <div className={styles.ques_ans_section}>
          <p className="py-1 text-xl font-semibold">
            {questionobj.question && decodeURIComponent(questionobj.question)}
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
            {questionobj.showStatus && (
            <p className="py-4 text-4xl text-center">
            {questionobj.showStatus}
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
