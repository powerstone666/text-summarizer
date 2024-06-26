import { useState,useEffect } from "react";
import myself from "./assets/learning.png";
function Text() {
   const [text, setText] = useState("");
   const [output, setOutput] = useState("");
   const [textColor, setTextColor] = useState("green");
   const [loading,setLoading]=useState(false)
   const changing = (e) => {
      setText(e.target.value);
   };
   useEffect(() => {
    if (text.length < 200 || text.length>2500 ) {
      setTextColor("red");
    } else{
      setTextColor("green");
    }
  }, [text]);
const clear = () => {
   setOutput("");
   setText("");
}
   const summarizing = async () => {
      setLoading(true)
    try{
        if(text.length>=200 && text.length<=2500){
      const response = await fetch(
         "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
         {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_api_token}` },
            method: "POST",
            body: JSON.stringify(text),
         }
      );
      const result = await response.json();
      setOutput(result[0].summary_text);
      setLoading(false)
  
    }
    else if(text.length<200){
        alert("Please enter atleast 200 words");
        setLoading(false)
    
    }
    else{
      alert("maximum length exceeded")
      setLoading(false)
    }
    }
    catch(e)
    {
        console.log(e);
    }
   };

   return (
      <div className="bg-white h-screen w-screen overflow-x-hidden">
         <nav className="h-24 bg-purple-600 ">
            <h1 className="text-4xl text-white text-center py-6">AI Text Summarizer App</h1>
         </nav>
         <p className="p-4 f text-xl text-center mt-8">Welcome to the AI Text Summarizer App! This app leverages the power of Artificial Intelligence APIs to provide concise summaries of long texts. Whether you have a lengthy article, research paper, or any other text document that you want to summarize quickly, our app can assist you.</p>
         <p className="p-4 f text-xl text-center mt-12">Simply paste your text into the text area below and click the "Submit" button.</p>
         <div className="h-1/2 w-full flex justify-center">
         <div className="w-4/5 flex  m-5 mt-10 ">
            <div className="bg-gray-50 h-full w-1/2 mr-5 rounded border-2 border-black">
               <textarea
                  type="text"
                  className="h-4/5 w-full p-10 bg-transparent placeholder:text-bold text-xl focus:outline-none "
                  placeholder="Enter the text here minimum 200 words  "
                  onChange={(e) => changing(e)} value={text}
               />
              <span className="text-xl justify-end flex m-8 mr-10 text-blue-900" >
               <h1 style={{ color: textColor }}>{text.length}/2500</h1>
               </span>
            </div>
            <div className="bg-white h-full w-1/2 rounded border-2 border-black">
               <h1 className="p-10 text-orange-900 text-xl">{output}</h1>
            </div>
         </div>
         </div>
         <div className="flex justify-center">
            {!loading?(
             <>
            <button className="bg-orange-400 hover:bg-orange-600 hover:text-white h-12 w-40 font-bold text-xl mb-5 rounded-lg" onClick={summarizing}>Summarize</button>
            <button className="bg-purple-400 hover:bg-purple-700 hover:text-white h-12 w-40 font-bold text-xl mb-5 ml-4 rounded-lg" onClick={clear}>Clear</button>
            </>
            ):(
               <h1 className="text-3xl text-orange-600 font-bold mb-12">
                  Loading........Summary !
               </h1>
            )}
         </div>
         <div>
            <section className="h-80 bg-green-50">
           <div className="flex justify-center">
          <div className="text-center mt-12">
         <h2 className="text-3xl font-bold p-4">Curious how to build this app?</h2>
          <p className="text-2xl">Join with me to elevate your software development and API knowledge to help you in your career.</p>
          <p className="text-2xl">Lets get Connect</p>
          <div className="flex justify-center p-5 ">
            <img src="https://cdn-icons-png.flaticon.com/128/15015/15015975.png" className="h-16 m-5 cursor-pointer" onClick={()=>{window.open("https://www.linkedin.com/in/imranpasha636/")}}/>
            <img src="https://cdn-icons-png.flaticon.com/128/3291/3291695.png" className="h-16 m-5 cursor-pointer" onClick={()=>{window.open("https://github.com/powerstone666/BuildHub")}}/>
          </div>
        </div>
        <img src={myself} className="h-80" />
      </div>
            </section>
         </div>
      </div>
   );
}

export default Text;
