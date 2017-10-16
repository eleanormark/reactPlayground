import React from 'react';
import Header from './Header';
import Action from './Action';
import AddOption from './AddOption';
import Options from './Options';
import OptionModal from './OptionModal';

class DecisionApp extends React.Component {
  state = {
    options: this.props.options,
    selectedOption: undefined
  };

  // constructor(props) {
  //   super(props);
  //   this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
  //   this.handleDeleteOption = this.handleDeleteOption.bind(this);
  //   this.handlePick = this.handlePick.bind(this);
  //   this.handleAddOption = this.handleAddOption.bind(this);
  //   this.state = {
  //     options: props.options
  //   };
  // }

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = optionToRemove => {
    this.setState(preState => ({
      options: preState.options.filter(option => {
        return optionToRemove !== option;
      })
    }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];

    this.setState(() => ({
      selectedOption: option
    }));
  };

  handleClearSelectedOption = () => {
    this.setState(() => ({ selectedOption: undefined }));
  };

  handleAddOption = option => {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'this option already exists';
    }
    this.setState(preState => ({ options: preState.options.concat(option) }));
  };

  // function fires after component renders to DOM
  // fetch data
  componentDidMount() {
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options: options }));
      }
    } catch (e) {
      // do nothing when there is invalaid JSON  data
    }
  }

  // function fires after the constructor() and before the render()
  componentWillMount() {
    console.log('componentWillMount');
  }

  // function fires when after component updates
  // save data
  componentDidUpdate(prevProps, preState) {
    if (preState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }

  // function fires when a component unmount from the screen
  componentWillUnmount() {
    console.log('componentWillUNmount');
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer.';

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">
          <Action
            handlePick={this.handlePick}
            hasOptions={this.state.options.length > 0}
          />
          <div className="widget">
            <Options
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
              options={this.state.options}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>

        <OptionModal
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}
        />
      </div>
    );
  }
}

DecisionApp.defaultProps = { options: [] };

export default DecisionApp;
