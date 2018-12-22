import React, { Component } from 'react';

class ShowFlag extends Component {

      constructor(props) {
		super(props);
		this.state = {
                  flagID: this.props.flagID
		};
	}

      getFlag = () => {

            const { flagID } = this.props;
            
            const url = `./img/flags/${flagID}`;

            fetch(url)
            .then((response) => {
                  console.log(response.type)
                  if(response.ok){
                        if(flagID !== this.state.flagID){
                              this.setState({ 
                                    flagID: this.props.flagID
                              });
                        }
                  } else {
                        if(flagID !== this.state.flagID){
                              this.setState({ 
                                    flagID: "no-flag"
                              });
                              return
                        }
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
                        <img src={require(`./../../img/flags/${this.state.flagID}.png`)} alt={this.props.flagID} className="flag" />
                  </div>
            );
      }
}

export default ShowFlag;