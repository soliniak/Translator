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
  console.log(regex)

  if (regex === "") return false
  try {
    new RegExp(regex);
  } catch (e) {
    return false;
  }
  return true;
}

let matchRegex = (regex, textInput) => {
  const regexFromInput = new RegExp(regex, "g");
  const found = textInput.match(regexFromInput);
  if (found !== "") {
    console.log(found)
    return found
  }
}

let validateToTranslate = toTranslate => {
  if (toTranslate.trim() !== "") {
    return toTranslate;
  }
}

let returnRegexOrText = (toTranslate, toRegex) => {

  if (validateRegex(toRegex)) {
    return matchRegex(toRegex, toTranslate)
  } else {
    return validateToTranslate(toTranslate);
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


  validateData = () => {
    const { toTranslate, toRegex } = this.props;

    if (api_key && translateLangDirection && toTranslate.trim() !== "") {
      return returnRegexOrText(toTranslate, toRegex)
    }
    return console.error("Invalid data. Check your API_KEY, translate direction for supported languages or text to translate (cannot be empty).");
  };


  makeRequestURL = () => {


    this.setState({
      loaderDisplay: true
    });
    return (requestUrl = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${api_key}&text=${this.validateData()}&lang=${translateLangDirection}`);
  };

  makeRequest = () => {
    this.makeRequestURL();
    return (request = new Request(requestUrl, {
      Accept: "*/*",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      host: "translate.yandex.net"
    }));
  };

  translate = () => {
    this.makeRequest();
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
        this.setState({
          translate: response.text,
          loaderDisplay: false
        });
      })
      .catch(error => console.error("Error:", error));
  };

  componentDidUpdate(props) {
    const { toTranslate, toRegex } = this.props;
    console.log(toTranslate, props.toTranslate, " oraz ", toRegex, props.toRegex);
    if (toTranslate !== props.toTranslate || toRegex !== props.toRegex) {
      this.translate();
    }
    // if (this.props.toRegex !== props.toRegex) {
    //   console.log("Hurra")
    // }
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
  if (regex !== "") {

    if (validateRegex(regex)) {

      return matchRegex(regex, textInput);

    } else {
      return "Invalid regex."
    }

  } else {
    return null
  }
}

export default Translate;