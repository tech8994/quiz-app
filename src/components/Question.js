import { useState, useEffect, useRef } from "react";
import styles from "@/styles/components/all_question.module.css";
import  DetailsQuestion  from "./Detail_question";

export default function Question() {
  let [Data, setData] = useState([]);
  let [questionobj, setQuestionObj] = useState({});
  let [loading, setLoading] = useState(true);
  let [questionCounter, setQuestionCounter] = useState(1);
  let [progressValue, setProgressValue] = useState(0);

  //   useRef use
  let refObject = useRef(null);
  useEffect(() => {
    (async() =>{
      setLoading(true);
     let response= await fetch("https://raw.githubusercontent.com/Entrolics-LLC/React-Quiz/master/src/questions.json");
      const Resdata = await response.json();
      console.log(Resdata);
      setData(Resdata);
      setLoading(false);
    })();
    // setLoading(true);
    // fetch(
    //   "https://raw.githubusercontent.com/Entrolics-LLC/React-Quiz/master/src/questions.json"
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setData(data);
    //   });
    // setLoading(false);
  }, []);

  //  Top Bar Section
  useEffect(() => {
    if (Data.length > 0 && loading == false) {
      setQuestionObj(Data[progressValue]);
      if (refObject.current) {
        refObject.current.style.width = `${
          (questionCounter / Data.length) * 100
        }%`;
      }
      console.log(Object.keys(questionobj).length != 0);
    }
    return;
  }, [progressValue,Data,loading, questionCounter, questionobj]);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div className={styles.container}>
          <div className={styles.progress_bar}>
            <div className={styles.nested_progress_bar} ref={refObject}></div>
          </div>
          <div>
            {Object.keys(questionobj).length != 0 ? (
              <>
                <DetailsQuestion
                  questionobj={questionobj}
                  questionCounter={questionCounter}
                  Data={Data}
                  setQuestionCounter={setQuestionCounter}
                  setProgressValue={setProgressValue}
                  progressValue={progressValue}
                />
              </>
            ): "Loading..." }
          </div>
        </div>
      )}
    </div>
  );
}
