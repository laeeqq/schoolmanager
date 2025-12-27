import { useState } from 'react' // helps us remeber the date
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [classes, setClasses] = useState([]); // a state(list) that holds all the added classes

  const [name, setName] = useState(""); // Class name input
  const [day, setDay] = useState("Monday"); // Day selection, default Monday
  const [time, setTime] = useState(""); // Time input

  function addClass() {
    if(!name || !time){
      alert("Please feel in the required fields");
      return;
    }

    if(classes >=5){
      alert("please add only 5 classes or below");
      return;
    }

    const newClass = {name , dat  ,time}; // create a new object 

  }

  return (
    <>
      <h1>My School Manager</h1>

      <button onClick={addClass}>
        Add Sample Class
      </button>

      <h2>Your Classes</h2>

      <ul>
        {classes.map((c, index) => (   //looping through the classes in the list
          <li key={index}>
            {c.name} — {c.day} at {c.time}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
