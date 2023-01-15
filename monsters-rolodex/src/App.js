// import { render } from '@testing-library/react';
import { Component } from 'react';
import CardList from './components/card-list/card-list.component'
import SearchBox from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
  }
  // jsonplaceholder.typicode.com/users

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
      .then((res) =>
        res.json())
      .then((users) => this.setState(() => {
        return { monsters: users }
      },
        () => {
          console.log(this.state);
        }));
  }


  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchField };
    });
  }

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    return (
      <div className='App'>
        <SearchBox
          className='search-box'
          onSearchChangeHandler={onSearchChange}
          placeholder='search monsters'
        />

        <CardList monsters={filteredMonsters} />
        {/* {filteredMonsters.map((monster) => {
          return <div key={monster.id}>
            <h1>{monster.name}</h1>
          </div>;
        })} */}
      </div>
    );
  }
}

export default App;
