import React from 'react';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.scss';

import Navigator from './components/navbar';
import CreateBook from './components/CreateBook';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';

function App() {
    return (
        <>
            {/*<Navigator />*/}

            {/*<Container>*/}
            {/*</Container>*/}
            <Router>
                <div>
                    <Routes>
                        <Route path='/' element={<ShowBookList />} />
                        <Route path='/create-book' element={<CreateBook />} />
                        <Route path='/edit-book/:id' element={<UpdateBookInfo />} />
                        <Route path='/show-book/:id' element={<ShowBookDetails />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}

export default App;
