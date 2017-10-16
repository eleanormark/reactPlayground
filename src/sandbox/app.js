class DecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: props.options
    };
  }

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

  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteOption(optionToRemove) {
    this.setState(preState => ({
      options: preState.options.filter(option => {
        return optionToRemove !== option;
      })
    }));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'this option already exists';
    }
    this.setState(preState => ({ options: preState.options.concat(option) }));
  }

  render() {
    const subtitle = 'Put your life in the hands of a computer';

    return (
      <div>
        <Header subtitle={subtitle} />
        <Action
          handlePick={this.handlePick}
          hasOptions={this.state.options.length > 0}
        />
        <Options
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
          options={this.state.options}
        />
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

DecisionApp.defaultProps = {
  options: []
};

const Header = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h3>{props.subtitle}</h3>}
    </div>
  );
};

Header.defaultProps = {
  title: 'AI Decision'
};

const Action = props => {
  return (
    <div>
      <button disabled={!props.hasOptions} onClick={props.handlePick}>
        What to do?
      </button>
    </div>
  );
};

const Options = props => {
  return (
    <div>
      <button onClick={props.handleDeleteOptions}>RemoveAll</button>
      {props.options.length ===0 && <p>Please add an option to get started.</p>}
      {props.options.map(option => {
        return (
          <Option
            key={option}
            optionText={option}
            handleDeleteOption={props.handleDeleteOption}
          />
        );
      })}
    </div>
  );
};

const Option = props => {
  return (
    <div>
      {props.optionText}
      <button
        onClick={e => {
          props.handleDeleteOption(props.optionText);
        }}
      >
        remove
      </button>
    </div>
  );
};

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value ='';
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<DecisionApp />, document.getElementById('app'));
