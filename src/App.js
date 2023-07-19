import "./App.css";
import { nanoid } from "nanoid";
import { MagnifyingGlass } from "react-loader-spinner";
import { useState } from "react";
import heroImg from "./images/hero_img.png";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [secondInputValue, setSecondInputValue] = useState("");
  const [thirdInputValue, setThirdInputValue] = useState("");

  const [data, setData] = useState([]);

  const onClick = () => {
    setIsLoading(true);

    const query = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Give me a startup ideas with these keywords ${inputValue} ${secondInputValue} ${thirdInputValue}`,
        },
      ],
    };

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify(query),
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Помилка при виконанні запиту.");
        }
        return response.json();
      })
      .then(function (data) {
        setData(data.choices[0].message.content.slice(1).split(/\d+/));
        setIsLoading(false);
        // console.log(data.choices[0].message.content.split(/\d+/))
      })
      .catch(function (error) {
        setErrorMessage("Unable to fetch startup ideas");
        setIsLoading(false);
      });
  };

  // console.log(data.map(i => console.log(i)))
  return (
    <div className="App">
      <div className="hero-box">
        <div>
          <h1 className="title">
            Do you want to start your own{" "}
            <span className="accent">startup</span>, but lack{" "}
            <span className="accent">ideas</span>? <br /> We'll{" "}
            <span className="accent">help</span> you with that!{" "}
          </h1>
          <p className="text">
            Just a few minutes, and you'll have a list of startup ideas tailored
            to your interests.
          </p>
          < a href="#generate" className="button-link">
            Generate
          </a>
        </div>

        <img src={heroImg} alt="Virtual reality" />
      </div>
      <div>
        <ul className="instruction-list">
          <li className="instruction-list-item">
            <h3>Type a keywords</h3>
          </li>
          <li className="instruction-list-item">
            <h3>Wait a few minutes</h3>
          </li>
          <li className="instruction-list-item">
            <h3>Get a list of ideas!</h3>
          </li>
        </ul>
      </div>
      <div id="generate" className="input-container">
        <input
        placeholder="Enter a keyword"
          className="input"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <input 
        placeholder="Enter a keyword"
          className="input"
          onChange={(e) => setSecondInputValue(e.target.value)}
        />
        <input
        placeholder="Enter a keyword"
          className="input"
          onChange={(e) => setThirdInputValue(e.target.value)}
        />
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <button className="button" disabled={isLoading} onClick={onClick}>
        Generate
      </button>
      {isLoading ? (
        <MagnifyingGlass
          visible={true}
          height="200"
          width="200"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      ) : (
        // <div>{data}</div>
        <ul className="list">
          {data.map((i) => {
            return (
              <li className="list-item" key={nanoid.id}>
                {i.slice(1)}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
