import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("");
  const [generatingAns, setGeneratingAns] = useState(false);

  async function generateAns(e) {
    setGeneratingAns(true);
    e.preventDefault();
    setAns("Loading your answer...");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${your api}",
        method: "post",
        data: {
          contents: [{ parts: [{ text: q }] }],
        },
      });

      setAns(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAns("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAns(false);
  }

  return (
    <>
      <div className="bg-gray-900 h-screen p-3">
        <form
          onSubmit={generateAns}
          className="w-full md:w-2/3 m-auto text-center rounded bg-gray-800 py-2"
        >
          <a href="https://github.com/ZahraMarym" target="_blank">
            <h1 className="text-3xl text-center text-white">Chat AI</h1>
          </a>
          <textarea
            required
            className="border rounded w-11/12 my-2 min-h-fit p-3"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-900 p-3 rounded-md hover:bg-blue-900 transition-all duration-300 text-white"
            disabled={generatingAns}
          >
            Generate Answer
          </button>
        </form>
        <div className="w-full md:w-2/3 m-auto text-center rounded bg-gray-800 my-1 text-white">
          <ReactMarkdown className="p-3">{ans}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default App;