import "./App.css";
import { nanoid } from "nanoid";
import { MagnifyingGlass } from "react-loader-spinner";
import { useState } from "react";
import heroImg from "./images/hero_img.png";
import addIcon from "./images/add-icon.svg";
import removeIcon from "./images/remove-icon.svg";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [inputValues, setInputValues] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const [data, setData] = useState([]);

  const changeLang = (lang) => {
    setSelectedLanguage(lang);
  };

  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];
  const [arr, setArr] = useState(inputArr);

  const addInput = (e) => {
    e.preventDefault()
    setArr((s) => {
      const newId = nanoid();
      return [
        ...s,
        {
          type: "text",
          id: newId,
          value: inputValues[newId] || "",
        },
      ];
    });
  };

  const removeInputFields = (id) => {
    setArr((s) => s.filter((item) => item.id !== id));
    setInputValues((prevInputValues) => {
      const updatedInputValues = { ...prevInputValues };
      delete updatedInputValues[id];
      return updatedInputValues;
    });
  };

  const handleChange = (e, id) => {
    e.preventDefault();
    const newValue = e.target.value;
  
    setInputValues((prevInputValues) => {
      const updatedInputValues = { ...prevInputValues };
      updatedInputValues[id] = newValue;
      return updatedInputValues;
    });
  //   e.preventDefault();
  // const newValue = e.target.value;

  // setInputValues((prevInputValues) => ({
  //   ...prevInputValues,
  //   [id]: newValue,
  // }));
  };

  const onClick = () => {
    setIsLoading(true);

    // const keywords = Object.values(inputValues);

    // Construct the query string with the input values
    const inputWords = Object.values(inputValues);
// console.log(inputWords)
    // Construct the query string with the input values
    const queryString = `words=${encodeURIComponent(inputWords.join('&'))}&language=${encodeURIComponent(selectedLanguage)}`;

    // console.log(queryString)

    fetch(`/api.php?${queryString}`)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Помилка при виконанні запиту. " + response.status);
        }
        // console.log(response.clone().text())
        return response.text();
      })
      .then(function (data) {
        // console.log(data)
        // setData(data)
        setData(data.slice(1).split(/\d+/));

        // setData(data.choices[0].message.content.slice(1).split(/\d+/));
        setIsLoading(false);
      })
      .catch(function (error) {
        setErrorMessage("Unable to fetch startup ideas");
        setIsLoading(false);
      });
  };


  return (
    <div className="App">
      <header className="header">
        <button onClick={() => changeLang("en")} className="lang-btn">
          EN
        </button>
        <button onClick={() => changeLang("ua")} className="lang-btn">
          UA
        </button>
      </header>
      <div className="hero-box">
        <div>
          <h1 className="title">
            {selectedLanguage === "en" ? (
              <span>
                Do you want to start your own{" "}
                <span className="accent">startup</span>, but lack{" "}
                <span className="accent">ideas</span>? <br /> We'll{" "}
                <span className="accent">help</span> you with that!{" "}
              </span>
            ) : (
              <span>
                Хочеш почати власний <span className="accent">стартап</span>,
                але бракує <span className="accent">ідей</span>? Ми допоможемо
                тобі!{" "}
              </span>
            )}
          </h1>
          {selectedLanguage === "en" ? (
            <p className="text">
              Just a few minutes, and you'll have a list of startup ideas
              tailored to your interests.
            </p>
          ) : (
            <p className="text">
              Лише декілька хвилин і в тебе є список ідей відповідно до твоїх
              інтересів.
            </p>
          )}
          {selectedLanguage === "en" ? (
            <a href="#generate" className="button-link">
              Go to idea generating
            </a>
          ) : (
            <a href="#generate" className="button-link">
              До генерування ідей
            </a>
          )}
        </div>

        <img className="image" src={heroImg} alt="Virtual reality" />
      </div>
      <div>
        <ul className="instruction-list">
          <li key={nanoid()} className="instruction-list-item">
            {selectedLanguage === "en" ? (
              <h3>Type a keywords</h3>
            ) : (
              <h3>Введи ключові слова</h3>
            )}
          </li>
          <li key={nanoid()} className="instruction-list-item">
            {selectedLanguage === "en" ? (
              <h3>Wait a few minutes</h3>
            ) : (
              <h3>Зачекай декілька хвилин</h3>
            )}
          </li>
          <li key={nanoid()} className="instruction-list-item">
            {selectedLanguage === "en" ? (
              <h3>Get a list of ideas!</h3>
            ) : (
              <h3>Отримай список ідей</h3>
            )}
          </li>
        </ul>
      </div>
      <form onSubmit={onClick}>
        <div id="generate" className="input-container">
          <input
            placeholder="..."
            className="input"
            onChange={(e, id) => handleChange(e, id)}
            id={nanoid.id}
            type="text"
          />
          <button className="add-btn" onClick={addInput}>
            <img className="icon" src={addIcon} alt="Add icon" />
          </button>
          {arr.map((item) => (
            <div key={item.id}>
              <input
                placeholder="..."
                className="input"
                onChange={(e) => handleChange(e, item.id)} // Pass the id of the input field
                value={inputValues[item.id] || ""} // Use the value from inputValues state
                type={item.type}
              />
              <button
                className="remove-btn"
                onClick={() => removeInputFields(item.id)}
              >
                <img className="icon" src={removeIcon} alt="Remove icon" />
              </button>
            </div>
          ))}
        </div>
        {errorMessage && <div className="error">{errorMessage}</div>}
        {selectedLanguage === "en" ? (
          <button className="button" disabled={isLoading} onClick={onClick}>
            Generate
          </button>
        ) : (
          <button className="button" disabled={isLoading} onClick={onClick}>
            Згенерувати
          </button>
        )}
      </form>
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
        // <ul className="list">
        //   {data.map((i) => {
        //     return (
        //       <li className="list-item" key={nanoid()}>
        //         {i.slice(1)}
        //       </li>
        //     );
        //   })}
        // </ul>

               <ul className="list">
          {data.map((i) => {
            return (
              <li className="list-item" key={nanoid()}>
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
