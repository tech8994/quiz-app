import { useState, useEffect, useRef } from "react";
import styles from "@/styles/components/all_question.module.css";
import  Question  from "./question";

export default function AllQuestion() {
  let [Data, setData] = useState([]);
  let [questionobj, setQuestionObj] = useState({});
  let [loading, setLoading] = useState(true);
  let [questionCounter, setQuestionCounter] = useState(1);
  let [progressValue, setProgressValue] = useState(0);

  //   useRef use
  let refObject = useRef(null);
  useEffect(() => {
    setLoading(true);
    fetch(
      "https://raw.githubusercontent.com/Entrolics-LLC/React-Quiz/master/src/questions.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
    setLoading(false);
  }, []);

  //  Top Bar Section
  useEffect(() => {
    if (Data.length) {
      setQuestionObj(Data[progressValue]);
      if (refObject.current) {
        refObject.current.style.width = `${
          (questionCounter / Data.length) * 100
        }%`;
      }
    }
    return;
  }, [progressValue, []]);

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
            {!!Data.length && (
              <>
                <Question
                  questionobj={questionobj}
                  questionCounter={questionCounter}
                  Data={Data}
                  setQuestionCounter={setQuestionCounter}
                  setProgressValue={setProgressValue}
                  progressValue={progressValue}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
