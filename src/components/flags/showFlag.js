import React, { Component } from 'react';
import Spinner from "../spinner/spinner";


class ShowFlag extends Component {

      constructor(props) {
		super(props);
		this.state = {
                  flagID: this.props.flagID,
                  loaderDisplay: false
		};
      }
      
      handleLoader = status => {
            status === "hide" ? status = false : status = true;
		this.setState({
			loaderDisplay: status
		});
	}

      getFlag = () => {
		this.handleLoader("show");
            const { flagID } = this.props;
            const url = `./flags/${flagID}.png`;

            fetch(url)
            .then((response) => {
                  if(response.ok){
                        if(flagID !== this.state.flagID){
                              this.setState({ 
                                    flagID: this.props.flagID
                              });
                        this.handleLoader("hide");
                        }
                  } else {
                        throw new Error(
                              `Can't get flag for ${flagID} - ${response.status}`
                        );
                  }
            })
            .catch(error => console.error(error))
      }

      componentDidUpdate(prevProps) {
            const { flagID } = this.props;
            if(flagID !== prevProps.flagID){
                  this.getFlag();
            }
      }

      render() {
            return (
                  <div className="flag__container">
                        <div className="flag__overflow">
                              {(this.state.loaderDisplay && <Spinner />) || (
                                    <img src={require(`./flags/${this.state.flagID}.png`)} alt={this.props.flagID} className="flag" />
                              )}
                        </div>
                  </div>
            );
      }
}

export default ShowFlag;