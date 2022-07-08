import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Article from './components/Article';
import StateEx from './components/StateEx';
import { useState } from 'react';
import JsxEx from './components/JsxEx';
import { isFocusable } from '@testing-library/user-event/dist/utils';
import Controller from './components/Controller';

function App() {
  const[title,setTitle] = useState('WEB');
  const [sub,setSub] = useState('World Wide Web');
  const[contents, setContents] = useState([
    {id:1, title:'HTML', desc:'HTML is for Infomation' },
    {id:2, title:'CSS', desc:'CSS is for Design' },
    {id:3, title:'JavaScript', desc:'JS is for Interactive' },
    {id:4, title:'언어', desc:'자바스크립트 언어' },
  ]);

const [mode, setMode] = useState('read');
const [welcome, setWelcome] = useState(
  {title:'Welcome', desc:'Welcome React'}
);

const [selected_id , setSelected_id] = useState(0);

let _title, _desc, _article= null;

if(mode === 'welcome'){
  _title = welcome.title;
  _desc = welcome.desc;
  _article = <Article title = {_title}desc = {_desc} />
}
else if(mode === 'read'){
  // _title = contents[0].title;
  // _desc = contents[0].desc;
  let i = 0;
  while(i<contents.length){
    console.log(`Content[i]: ${contents[i].id}, ${selected_id}`);
    if(contents[i].id == selected_id){
      _title = contents[i].title;
      _desc = contents[i].desc;
       console.log(`Content[i]: ${contents[i].id}, ${selected_id}`);
      break;
    }
    i++;
    _article = <Article title = {_title} desc = {_desc} />
  }
}
else{
  console.log('else');
}


  return (
    <div className="App">
      <JsxEx />
      {/* <StateEx /> */}
      {/* <Header title ="WWW" sub = "Header is value!!"/> */}
      {/* <Header title = {title} sub = {sub}/> */}
      <Header title = {title} 
              sub = {sub}
              onChangePage = {()=>{
                setMode('welcome');
              }
        }        
      />
      {/* <Nav2 data={contents}/> */}
      <Nav data={contents}
        onChangePage = { (id) => {
          setMode('read');
          setSelected_id(id);
          console.log(`Nav: ${id}`);
        }} />

      <Controller onChangePage={ (mode)=>{
        setMode(mode);
      }

      } />
      {/* <Article 
        title = "HTML" 
        desc = "HTML is HyperTest Markup Language" /> */}
         {/* <Article 
            title = {_title}
            desc = {_desc} /> */}
    </div>
  );
}

export default App; 
