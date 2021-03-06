import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Article from './components/Article';
import StateEx from './components/StateEx';
import { useEffect, useRef, useState } from 'react';
import JsxEx from './components/JsxEx';
import { isFocusable } from '@testing-library/user-event/dist/utils';
import Controller from './components/Controller';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import { click } from '@testing-library/user-event/dist/click';

function App(){
  let countVar = 0; //만약 렌더링이 발생하면 이 값은 0으로 초기화됨 (맨 처음부터 다시 실행되는거니까 )
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState('true'); 
  const countRef = useRef(0);
  const inputRef = useRef(); //!!랜더링 안하고 싶을 때 사용!!일반 변수와 같이 값을 변경해도 랜더링 되지 않음. 하지만 랜더링 시 값이 초기화 되지 않음 

  console.log(`(랜더링) count -> ${count}`); 
  console.log(`(랜더링) mode -> ${mode}`); 
  console.log(`(랜더링) countRef -> ${countRef.current}`); 

  const check = () => {
    console.log(`check() -- > `);
    console.log(inputRef);
    alert(`welcome ${inputRef.current.value}`) //입력받은 값은 inputRef.current.value로 접근 가능
  }

  //화면 렌더링 시에 실행됨
  useEffect(() => {
    console.log('useEffect() 실행 됨');
  }, [mode]); //mode변수 한번만 실행
  // 매 번 실행: useEffect(() => {});
  // 한 번만 실행: useEffect(() => {}, []);
  // 특정 변수가 바뀔때만 실행: useEffect(() => {}, [변수]);
  return(
    <div>
       <p> [let] Click {count} times (preventDefault)</p>
      <a href = "http://localhost:3000/" onClick={(e)=>{
        e.preventDefault(); //잠깐 고유동작을 막아라!! 이걸 막지 않으면 리셋됨
        setCount(count+1);
      }}> 
        Click (preventDefault)</a>
        <hr />
        <br />

      <input ref = {inputRef} type = "text" placeholder='username'></input>
      <button onClick={check}>제출</button>

     {/* let 사용 */}
     <p>[let] Clicked {countVar} times</p>
      <button onClick = {() => {
        countVar = countVar + 1;  //랜더링하지 않아서 화면이 변하지 않음
        console.log(`countVar: ${countVar}`);
      }}>Click (let) </button>

      {/* useState 사용 */}
      <p>[useState] Clicked {count} times</p>
      <button onClick = {() => {
        setCount(count + 1);  //useState로 인해 랜더링되어 화면이 변함
      }}>Click (useState) </button>

      <p>[useEffect] Clicked {mode}</p>
      <button onClick = {() => {   //화면 렌더링 시에 실행됨
        setMode(mode === 'true' ? 'false' : 'true');
      }}>Click (useEffect) </button>

      <p>[useRef] Clicked {countRef.current}</p>
      <button onClick = {() => {
        countRef.current += 1;
        console.log(`countRef: ${countRef.current}`);
      }}>Click (useRef) </button>
    </div>
  )
}

function App_myapp() {
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

const getReadContent = () => {
  console.log(`getReadContent ==> selected_i ${selected_id}`);
  let i =0;
  let selected_index = 0;

  while(i < contents.length){
    if(contents[i].id === selected_id){
      selected_index = i;
      break;
    }
    i++;
  }
  return contents[selected_index]; 
}

if(mode === 'welcome'){
  _title = welcome.title;
  _desc = welcome.desc;
  _article = <Article title = {_title} desc = {_desc} />
}
else if(mode === 'read'){
  // _title = contents[0].title;
  // _desc = contents[0].desc;
  let i = 0;
  while(i<contents.length){
    //console.log(`Content[i]: ${contents[i].id}, ${selected_id}`);
    if(contents[i].id == selected_id){
      _title = contents[i].title;
      _desc = contents[i].desc;
       //console.log(`Content[i]: ${contents[i].id}, ${selected_id}`);
      break;
    }
    i++;
  }
  _article = <Article title = {_title} desc = {_desc} />
}
else if(mode == 'create'){
  console.log('create mode');
  _article = <CreateContent
                onSubmit = { (_title,_desc) =>{
                  console.log(`CreateContent title:${_title} ,desc:${_desc}`);
                  let max_content_id = contents.length + 1;
                  setContents(
                    //[기존내용, 새로채워지는 내용]
                    [ ...contents, 
                      {id: max_content_id,
                       title: _title,
                      desc:_desc}
                    ]
                  );
                }}
                />
}
else if(mode == 'update'){
  console.log('update mode --> ');
  //수정해야 될 항목의 데이터 저장
  let _content = getReadContent();
  _article  = <UpdateContent
                  data = {_content}
                  onSubmit = { (_title, _desc) => {
                    console.log(`UpdateContent title:${_title} ,desc:${_desc}`);
                    contents[selected_id - 1].title = _title;
                    contents[selected_id  -1].desc = _desc;
                    setMode('welcome'); //수정후 nav리스트 값 변화시키기 위해서(다시 리로딩) 사용
                  }}
                ></UpdateContent>
}
else{
  console.log('else');
}


  return (
    <div className="App">
      {/* <JsxEx /> */}
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

      <Controller onChangeMode={ (mode)=>{
        setMode(mode);
        if(mode === 'delete'){
          let _contents = Array.from(contents);
          console.log(`delete selected_id : ${selected_id}`);
          if(window.confirm('Really Delete!!')) {
            _contents.splice(selected_id-1,1);
            setContents(_contents);
            setMode('welcome');
          }
        }
      }

      } />

      {_article}
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
