
/**
 * 
 * @param {string} a first player 
 * @param {string} b second player
 * @returns gameType
 */
function createGame(a,b){
    this.a=a;
    this.aPalo="x";
    this.b=b;
    this.bPalo="0";
    let table=[["&","&","&"],["&","&","&"],["&","&","&"]];
    let stackRows=[[],[],[]];
    let stackColumns=[[],[],[]];
    let diagonal=[[],[]];

    aPt=0;
    bPt=0;

    function reset(){
        
        table=[["&","&","&"],["&","&","&"],["&","&","&"]];
        stackRows=[[],[],[]];
        stackColumns=[[],[],[]];
        diagonal=[[],[]];
    }

    function Play(palo, x, y){
        x=Math.max(1,x);
        y=Math.max(1,y);
        if(table[y-1][x-1]==="&"){
            table[y-1][x-1]=palo;
            stackRows[y-1].push(palo);
            stackColumns[x-1].push(palo);
            if(y-1===x-1) diagonal[0].push(palo);
            if(y+x-2=== 3-1 ) diagonal[1].push(palo);
            return true;
        }

        return false;

    }

    function aWins(){
        aPt++;
    }

    function bWins(){
        bPt++;
    }

    function getResult(){
        console.log(a, aPt," : ",b,bPt);
        return {"ra":aPt, "rb":bPt};
    }

    function DrawTable(){
        console.table(table);
    }

    function isOver(){
        
        let rows=[...stackRows,...stackColumns,...diagonal];
        rows=rows.filter((x)=>x.length===3);
        
        for(const x of rows){
            if(x[0]===x[1] && x[1]===x[2]){
                //three in line

                if(x[0]===aPalo){
                    aWins();
                }else{
                    bWins();
                }
                return true;
            }
        } 
        if(rows.length===7){
            //the board is completed
            return true;
        }

        return false;
    }

    return {getResult, DrawTable, Play, isOver, reset, }
}

       
//#region gameLogic

var game=createGame("X","O");
let currentPlayer=0;


let gato=document.querySelector(".gato");
gato.addEventListener("click", (event)=>{
    event.preventDefault();

    let pos;
    try{
        pos=event.target.getAttribute("data-pos");
        pos=pos.split(",");
        console.log({pos});
    }catch(error){
        return;
    }
    let palo=currentPlayer===0?"✖":"◯";

    if(game.Play(palo,pos[0],pos[1])){
        event.target.innerText=palo;
        currentPlayer = (currentPlayer+1)%2;
        
    }
})
//#endregion