const variables = {
    round:0,
    score:0,
    color:'',
    difficult:0,
    listSort: [],
    listUser:[]
};
const block = () =>{
    if (document.getElementById('iniciar-dificuldade')) {
        return false;
    } else {
        return true;
    }
};
const confirm = () =>{
    console.log(variables.listSort)
    console.log(variables.listUser)
    var array = variables.listSort.slice(0, variables.listUser.length);
    array = array.toString();
    if (array != variables.listUser.toString()){
        console.log('GAME OVER')
        gameOver();
        return;
    };
};
const clickBlue = async() =>{
    clicks('blue')
};
const clickRed = async() =>{
    clicks('red')
};
const clickYellow = async() =>{
    clicks('yellow')
};
const clickGreen = async() =>{
    clicks('green')
};
const clicks = async(color) =>{
    if (block()) {
        variables.listUser.push(color);
        playing();
        document.getElementById(color).style.opacity = 0.5
        await sleep(20);
        document.getElementById(color).style.opacity = 1;
        await sleep(20)
    };
};
const lightUpColor = async(color, time) =>{
    await sleep(50)
    document.getElementById(color).style.opacity = 0.5;
    return new Promise((resolved, reject)=>{
        setTimeout(()=>{
            document.getElementById(color).style.opacity = 1;
            resolved('Cor');
        }, time);
    }).then((value)=>{
        return value;
    });
};
const sortColor = () =>{
    var number = Math.floor(Math.random() * 4)
    if (number == 1) {
        variables.listSort.push('green')
        variables.listUser = [];
        return 'green';
    } else if( number == 2){
        variables.listSort.push('red')
        variables.listUser = [];
        return 'red';
    } else if (number == 3) {
        variables.listSort.push('yellow')
        variables.listUser = [];
        return 'yellow';
    }else {
        variables.listSort.push('blue')
        variables.listUser = [];
        return 'blue';
    }
};
const sleep = (time, func) => new Promise((resolved, reject)=>{
    setTimeout(()=>{resolved('')}, time)
}).then(()=>{});
const playing = async() =>{
    confirm();
    if (variables.listSort.length == variables.listUser.length) {
        var difficult = variables.difficult;
        if (variables.listSort.toString() == variables.listUser.toString()) {
            if (difficult == 1) {
                await lightUpColor(sortColor(), 1000)
                return
            } else if(difficult == 2){
                await lightUpColor(sortColor(), 500)
                sleep(500)
                lightUpColor(sortColor(), 500)
                return
            } else if (difficult == 3){
                console.log('Aqui')
                await lightUpColor(sortColor(), 300)
                sleep(300)
                await lightUpColor(sortColor(), 300)
                sleep(300)
                lightUpColor(sortColor(), 300)
                return
            }
        }else{
            gameOver()
        }     
    }
};
const gameOver = () =>{
    document.getElementById('main').style.display = 'none';
    document.getElementById('gameOver').style.display = 'flex';
    var score = variables.listSort.length - 1
    document.getElementById('h2').innerText = 'Pontuação: ' + score
    setTimeout(()=>{
        document.getElementById('main').style.display = 'flex';
        document.getElementById('gameOver').style.display = 'none';
        document.getElementById('playing').id = 'iniciar-dificuldade';
    }, 5000)
    variables.listUser = [];
    variables.color = '';
    variables.score = 0;
    variables.difficult = 0;
    variables.round = 0;
    variables.listSort = [];
    console.group(variables)
};
const start = () =>{
    variables.difficult = document.getElementById('range').value;
    playing();
    document.getElementById('iniciar-dificuldade').id = 'playing';
};