import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import FilterMenuBar from './Components/FilterMenuBar';
import SearchBar from './Components/SearchBar';
import ButtonBar from './Components/ButtonBar';

function App() {
	return (
		<div className="App">
			<Header />
			<FilterMenuBar />
			<SearchBar />
			<ButtonBar />
		</div>
	);
}

export default App;
