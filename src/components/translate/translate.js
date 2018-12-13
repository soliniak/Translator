import React, { Component } from "react";
import Spinner from "../spinner/spinner";
import ShowTranslatedText from "./showTranslatedText";

const errorsList = [
  ["200", "Operation completed successfully"],
  ["400", "Bad request"],
  ["401", "Invalid API key"],
  ["402", "Blocked API key"],
  ["404", "Exceeded the daily limit on the amount of translated text"],
  ["413", "Exceeded the maximum text size"],
  ["422", "The text cannot be translated"],
  ["501", "The specified translation direction is not supported"]
];
const errors = new Map(errorsList);
const api_key =
  "trnsl.1.1.20181123T092134Z.1958dff3c4d99a2f.7d766cc459780e04775317ff9d84a4d0a5c4d38d";
const translateLangDirection = "pl-en";
let request, requestUrl;


let validateRegex = regex => {
  if (regex.trim() === "") {
    console.log("No regex")
    return false;
  }
  try {
    new RegExp(regex);
  } catch (e) {
    return false;
  }
  return true;
}

let matchRegex = (textInput, regex) => {
  const regexFromInput = new RegExp(regex, "g");
  const found = textInput.match(regexFromInput);
  if (found !== "") {
console.log(found.index)
    return found;
  }
  return false;
}

let validateTextToTranslate = toTranslate => {
  if (toTranslate.trim() !== "") {
    return toTranslate;
  }
}

let returnRegexOrText = (toTranslate, regexValue) => {
  if (validateRegex(regexValue)) {
    return matchRegex(toTranslate, regexValue)
  } else {
    return validateTextToTranslate(toTranslate);
  }
}

class Translate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translate: "",
      error: "",
      loaderDisplay: false
    };
  }

  // if (validateRegex(toRegex)) {
  //   matchRegex(toRegex, toTranslate)
  //   console.log("Valid regex")
  // } else {
  //   console.error("Invalid regex")
  // }


  validateData = (toTranslate, regexValue) => {
    if (api_key && translateLangDirection && toTranslate.trim() !== "") {
      return returnRegexOrText(toTranslate, regexValue)
    }
    return console.error("Invalid data. Check your API_KEY, translate direction for supported languages or text to translate (cannot be empty).");
  };


  makeRequestURL = (toTranslate, regexValue) => {
    this.setState({
      loaderDisplay: true
    });
    let validateData = this.validateData(toTranslate, regexValue);
    return (requestUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${api_key}&text=${validateData}&lang=${translateLangDirection}`);
  };

  makeRequest = (toTranslate, regexValue, mixWithText) => {
    requestUrl = this.makeRequestURL(toTranslate, regexValue);
    return (request = new Request(requestUrl, {
      Accept: "*/*",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      host: "translate.yandex.net"
    }));
  };

  translate = (toTranslate, regexValue, mixWithText) => {

    // this.fetchData(toTranslate, regexValue);
    request = this.makeRequest(toTranslate, regexValue);
    fetch(request)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(
            `Something went wrong on API server! Error code: ${
            response.status
            } - ${errors.get(response.status.toString())}`
          );
        }
      })
      .then(response => {
        if(mixWithText){
          console.log(mixWithText, toTranslate, regexValue)
          const regexFromInput = new RegExp(regexValue, "gi");
          this.setState({
            translate: toTranslate.replace(regexFromInput, (a, b)=>{
              console.log(a)
              return response.text[b]
            }),
            loaderDisplay: false
          });          
        } else {
          this.setState({
            translate: response.text,
            loaderDisplay: false
          });
        }
      })
      .catch(error => console.error("Error:", error));
  };

  componentDidUpdate(props) {
    const { toTranslate, regexValue, mixWithText } = this.props;

    // console.log(toTranslate, props.toTranslate, " oraz ", regexValue, props.regexValue);

    if (toTranslate !== props.toTranslate || regexValue !== props.regexValue || mixWithText !== props.mixWithText) {
      console.log("Zmienił się tekst, regex lub checbox")
      this.translate(toTranslate, regexValue, mixWithText);
      return;
    }
  }

  render() {
    return (
      <div className="output">
        {(this.state.loaderDisplay && <Spinner />) || (
          <ShowTranslatedText translatedText={this.state.translate} />
        )}
      </div>
    );
  }
}

export const TranslateRegex = (regex, textInput) => {
  if (regex) {
    if (validateRegex(regex)) {
      return matchRegex(textInput, regex, false);
    } else {
      return "Invalid regex.";
    }
  } 
    return null;
}

export default Translate;