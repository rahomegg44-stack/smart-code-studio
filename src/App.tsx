import { useState } from "react";
import Editor from "@monaco-editor/react";

const languageTemplates: any = {
  javascript: `// JavaScript
function hello(){
  console.log("Hello from JavaScript");
}

hello();`,

  python: `# Python
def hello():
    print("Hello from Python")

hello()`,

  cpp: `#include <iostream>
using namespace std;

int main(){
    cout << "Hello from C++" << endl;
    return 0;
}`,

  csharp: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello from C#");
    }
}`,

  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello from Java");
  }
}`,

  html: `<!DOCTYPE html>
<html>
<head>
<title>HTML Page</title>
</head>
<body>

<h1>Hello HTML</h1>

</body>
</html>`,

  css: `body{
  background:#111;
  color:white;
}`
};

function App() {

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(languageTemplates["javascript"]);
  const [output, setOutput] = useState("");

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setCode(languageTemplates[lang]);
    setOutput("");
  };

  const runCode = () => {

    if(language === "javascript"){
      try{

        const logs: string[] = [];
        const oldLog = console.log;

        console.log = (...args)=>{
          logs.push(args.join(" "));
        };

        eval(code);

        console.log = oldLog;

        setOutput(logs.join("\n"));

      }catch(e){
        setOutput(String(e));
      }
    }else{

      setOutput("Running this language will be supported later.");
    }

  };

  return (

    <div style={{height:"100vh",display:"flex",flexDirection:"column",background:"#1e1e1e"}}>

      <div style={{
        background:"#111",
        color:"white",
        padding:"10px",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center"
      }}>

        <div>
          <b style={{fontSize:"22px"}}>Smart Code Studio</b>
          <div style={{fontSize:"12px",color:"#aaa"}}>
            Developed by Abdulrahman Shaker
          </div>
        </div>

        <div style={{display:"flex",gap:"10px"}}>

          <select
            value={language}
            onChange={(e)=>changeLanguage(e.target.value)}
            style={{
              padding:"6px",
              background:"#1e1e1e",
              color:"white",
              border:"1px solid #444"
            }}
          >

            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="csharp">C#</option>
            <option value="java">Java</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>

          </select>

          <button
            onClick={runCode}
            style={{
              background:"#007acc",
              border:"none",
              color:"white",
              padding:"6px 12px",
              cursor:"pointer"
            }}
          >
            Run
          </button>

        </div>

      </div>

      <Editor
        height="70%"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(value)=>setCode(value || "")}
      />

      <div style={{
        height:"20%",
        background:"#111",
        color:"#00ff88",
        padding:"10px",
        fontFamily:"monospace"
      }}>
        {output}
      </div>

      <div style={{
        height:"10%",
        background:"#0d0d0d",
        color:"#777",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      }}>
        © 2026 Abdulrahman Shaker
      </div>

    </div>

  );
}

export default App;