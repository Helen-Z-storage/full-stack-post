import './App.css';
import React from 'react';
import NavigationBar from './navigationBar';
import ListPost from './listPost';

function App() {

  return (
    <div>
      <NavigationBar />
      <ListPost />
    </div>
  );
}


/*
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
      fetch("http://localhost:8080/routes/testAPI")
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res }))
          .catch(err => err);
  }

  componentWillMount() {
      this.callAPI();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p className = "App-intro">{this.state.apiResponse}</p>
      </div>
    );
  }
}

*/
export default App;
