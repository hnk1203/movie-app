import { useState, useEffect } from "react";
import styles from "./App.module.css"
import Button from "./Button";

function App() {
  const [counter, setValue] = useState(0);
  const onClick = () => setValue((prev) => prev + 1);
  console.log("i run all the time");
  const iRunOnlyOnce = () => {
    console.log(" irun once");
  }
  useEffect(()=> {
    console.log("call THE API");
  }, []);
  return (
    <div>
      <h1 className={styles.title}>{counter}</h1>
      <button onClick={onClick}>click me</button>
      <Button text={"빡빡이 아저씨"}/>
    </div>
  );
}

export default App;
