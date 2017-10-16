console.log('app.js is running');

const app = {
  title: 'AI Decision Making',
  subtitle: 'Put your life in the hands of a computer random algorithm.',
  options: []
};

const onFormSubmit = e => {
  e.preventDefault();
  const option = e.target.elements.option.value;
  if (option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    render();
  }
};
const onRemoveAll = () => {
  app.options = [];
  render();
};

const makeDecision = () => {
  const randomNum = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNum];
  alert(option);

  render();
};

const render = () => {
  var template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
      <button disabled={app.options.length===0} onClick={makeDecision}>
        What should I do?
      </button>
      <button onClick={onRemoveAll}>Remove All</button>
      <ol>
        {app.options.map(option => {
          return <li key={option}> {option} </li>;
        })}
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option" />
        <button>Add Option</button>
      </form>
    </div>
  );

  ReactDOM.render(template, document.getElementById('app'));
};

render();
