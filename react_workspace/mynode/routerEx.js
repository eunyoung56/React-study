let http = require('http');
let express = require('express');
let app =  express();

app.set('port',3000);

let server = http.createServer(app).listen(app.get('port'),()=>{
    console.log('express 이용 서버 실행중..');
})

//특정 폴더를 url로 접근하기 위한 설정(미들웨어)
let static = require('serve-static');
let path = require('path'); //현재 디렉토리 정보
const { urlencoded } = require('express');

let pathName = path.join(__dirname, 'public'); //__dirname 현재 디렉토리 정보
console.log('pathName :' + pathName);

app.use('/public', static(pathName)); //localhost:3000/public/으로 public 폴더 접근가능
app.use(static(pathName));//loaclhost:3000/ 로 접근가능

app.use(express.urlencoded());//post : application/x-www-form-urlencoded
app.use(express.json());//post : application//json

//라우터 처리 
let router = express.Router();
//중요. '/' 입력되면, router객체로 연결
app.use('/',router);


router.route('/process/login/:name').all((req,res) => { //all get/post방식 모두 처리함
    console.log('/process/login(post) 처리 중!!');
    //get/post 방식 모두 처리할 수 있도록 함
    let id = req.body.id || req.query.id;
    let password = req.body.password || req.query.password;
    let name = req.params.name;

    // res.send('id : ' + id + ',password' + password + ' ,name : ' + name);
    res.send(`id : ${id} ,password : ${password} ,name : ${name}`);
})

router.route('/process/login').post((req,res) => {
    console.log('/process/login(post) 처리 중!!');
    //get/post 방식 모두 처리할 수 있도록 함
    let id = req.body.id || req.query.id;
    let password = req.body.password || req.query.password;

    res.send('id : ' + id + ',password' + password);
})

router.route('/process/login').get((req,res) => {
    console.log('/process/login(get) 처리 중!!');
    //get/post 방식 모두 처리할 수 있도록 함
    let id = req.body.id || req.query.id;
    let password = req.body.password || req.query.password;

    res.send('id : ' + id + ',password' + password);
})

router.route('/process/login').all((req,res) => {
    console.log('/process/login(all) 처리 중!!');
    //get/post 방식 모두 처리할 수 있도록 함
    let id = req.body.id || req.query.id;
    let password = req.body.password || req.query.password;

    res.send('id : ' + id + ',password' + password);
})

app.all('*', (req, res) => {
    console.log(' 에러 처리 ..');
    res.status(404).send('요청한 페이지를 찾을 수 없습니다. 체크하세요...');
})