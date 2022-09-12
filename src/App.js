import React, { useState, useEffect } from "react";
import {nanoid} from 'nanoid';

import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {

  const [notes, setNotes] = useState([
    
    {
      id: nanoid(),
      text: "This is the first note",
      date: '15/05/1020',
    },
    {
      id: nanoid(),
      text: "This is the second note",
      date: '05/05/1020',
    },
    {
      id: nanoid(),
      text: "This is the third note",
      date: '25/05/1020',
    },
    {
      id: nanoid(),
      text: "This is the last note",
      date: '30/05/1020',
    },
]);
const [searchText, setSearchText] = useState('');
const [darkMode, setDarkMode] = useState(false);


//retrieve data from loacal-storage
useEffect(() => {
  const savedNotes = JSON.parse(
    localStorage.getItem('react-notes-app-data')
  );

  if(savedNotes){
    setNotes(savedNotes);
    console.log('done')
  }

},[]);

//store notes in local-storage
useEffect(() => {
  localStorage.setItem(
    'react-notes-app-data',
    JSON.stringify(notes)
    )
    console.log('saved')
},[notes])

const addNote = (text) => {
  const date = new Date();
  const newNote = {
    id: nanoid(),
    text: text,
    date: date.toLocaleDateString()
  }

  const newNotes = [...notes, newNote];

  setNotes(newNotes);
};

const deleteNote = (id) => {
  const newNotes = notes.filter((note) => note.id !== id);
  setNotes(newNotes);
};



  return(
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode}/>
        <Search handleSearchNote={setSearchText} />
        <NotesList 
          notes={notes.filter((note) => 
                  note.text.toLowerCase().includes(searchText)
                )} 
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
          />
      </div>
    </div>
  )
}

export default App;