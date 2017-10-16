class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false
    };
    this.handleToggleViz = this.handleToggleViz.bind(this);
  }
  handleToggleViz() {
    this.setState(preState => {
      return {
        visibility: !preState.visibility
      };
    });
  }
  render() {
    return (
      <div>
        <h1>Visibility Toggle</h1>
        <button onClick={this.handleToggleViz}>
          {this.state.visibility ? 'hide details' : 'show details'}
        </button>
        {this.state.visibility && (
          <div>
            <p>Details you can see</p>
          </div>
        )}
      </div>
    );
  }
}

ReactDOM.render(<Toggle />, document.getElementById('app'));

// let visbility = false;
// const toggleViz = () => {
//   visbility = !visbility;
//   render();
// };

// const render = () => {
//   const jsx = (
//     <div>
//       <h1>Visibility Toggle</h1>
//       <button onClick={toggleViz}>
//         {visbility ? 'hide details' : 'show details'}
//       </button>
//       {visbility && (
//         <div>
//           <p>Details you can see</p>
//         </div>
//       )}
//     </div>
//   );
//   ReactDOM.render(jsx, document.getElementById('app'));
// };

// render();
