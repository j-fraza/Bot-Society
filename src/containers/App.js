import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import '../containers/App.css';

import { useDispatch, useSelector } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

function App() {
    const [setRobots] = useState([]);
    // const [searchField, setSearchField] = useState('');
    const dispatch = useDispatch();

    const { searchField } = useSelector(
        (state) => state.requestRobots
    )

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => {setRobots(users)});
        onRequestRobots();
    }, [])

    const onSearchChange = (event) => {
        dispatch(setSearchField(event.target.value));
    }

    const onRequestRobots = () => {
        dispatch(requestRobots())
    }

    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return !robots.length ? 
    <h1>Loading</h1> :
    (
        <div className='tc'>
            <h1 className='f1'>BotSociety</h1>
            <SearchBox searchChange = {onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundry>
            </Scroll>
        </div>
    );
}

export default App;