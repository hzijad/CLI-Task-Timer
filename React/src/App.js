import React, { useState } from 'react';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [text, setText] = useState('');
  const [newInput, setNewInput] = useState('');
  const [useCode,setUseCode] = useState('javascript');
  const [selected, setSelected] = useState(1);


  const pythonCode = `# Python code example
def task_timer():
    print("Task Timer in Python")`;

  const csharpCode = `// C# code example
public class TaskTimer {
    public void Run() {
        Console.WriteLine("Task Timer in C#");
    }
}`;

  const javascriptCode = `// JavaScript code example
function taskTimer() {
    console.log("Task Timer in JavaScript");
}`;


  const handleSend = () => {
    if(newInput==="clr"|| newInput==="clear"){
      setText(" ")
      setNewInput("")
    }else if (newInput===""){

    }else{
      let url = 'http://localhost:3001/timerRequests';
      if(useCode==="javascript"){
         url = 'http://localhost:3001/timerRequests';
      }else if(useCode==="python"){
         url='http://localhost:5000/timerRequests/timers';
      }else{
         url = 'http://localhost:3001/timerRequests';
      }
      console.log(code)

      const body = {
        command: newInput
      };
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        }
      }).then(res => res.json())
          .then((jsonres) => {
            setText(prevText => prevText + '\n' + newInput + '\n' + jsonres.message);
            setNewInput(''); // Clear the new input text
          });
    }
  };

  const logText = (textArea) => {
    setNewInput(textArea.target.value);
  };

  const buttonClass = (id) => {
    return selected === id ? 'top-button selected' : 'top-button';
  };

  return (
      <div className="App">
        <header className="App-header">
          <div className="top-center-text">
            <p className="course-code">IUS-CS305</p>
            <p className="names">Zijad Helja, Asmin Bašić, Nađa Bučuk</p>
          </div>
          <a href="https://github.com/hzijad/CLI-Task-Timer" className="top-button">Github</a>
          <div className="project-description">
            <p className="title">CLI Task Timer</p>
            <p className="description">
              This project is a web application that showcases a CLI-based Task Timer implemented in three different programming languages: Python, C#, and JavaScript. The website allows users to explore and interact with the Task Timer application in their preferred language. It demonstrates the same functionality across each language, highlighting both versatility and ease of use.
            </p>
          </div>
          <div className="language-buttons">
            <button className={buttonClass(1)} onClick={() => {
              setSelected(1);  // Set selected button
              setCode(javascriptCode)
              setUseCode("javascript")
            }}>JavaScript</button>
            <button className={buttonClass(2)} onClick={() => {
              setSelected(2);  // Set selected button
              setCode(pythonCode)
              setUseCode("python")
            }}>Python</button>
            <button className={buttonClass(3)} onClick={() => {
              setSelected(3);  // Set selected button
              setCode(csharpCode)
              setUseCode("csharp")
            }}>C#</button>
          </div>
          <div className="chatboxes">
            <div className="left-chatbox">
              <textarea onInput={logText} value={newInput} placeholder="Write code.."></textarea>
              <button className="send-button" onClick={handleSend}>Send</button>
            </div>
            <div className="left-chatbox">
              <textarea readOnly value={text} placeholder="Code Output"></textarea>
            </div>
          </div>
        </header>
      </div>
  );
}

export default App;
