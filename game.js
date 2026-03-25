
/**
 * 
 * @param {string} a first player 
 * @param {string} b second player
 * @returns gameType
 */
function createGame(a,b){
    class token{
        constructor(palo,x,y){
            this.x=x;
            this.y=y;
            this.palo=palo;
        }
    }
    this.completed=false;
    this.a=a;
    this.aPalo="✖";
    this.b=b;
    this.bPalo="◯";
    let table=[["&","&","&"],["&","&","&"],["&","&","&"]];
    let stackRows=[[],[],[]];
    let stackColumns=[[],[],[]];
    let diagonal=[[],[]];
    let winning=[];

    aPt=0;
    bPt=0;

    function reset(){
        
        table=[["&","&","&"],["&","&","&"],["&","&","&"]];
        stackRows=[[],[],[]];
        stackColumns=[[],[],[]];
        diagonal=[[],[]];
        winning=[];
        completed=false;
    }

    function Play(palo, x, y){
        if(completed)
            return false;
        x=Math.max(1,x);
        y=Math.max(1,y);
        if(table[y-1][x-1]==="&"){
            table[y-1][x-1]=palo;
            const tk=new token(palo,x,y);
            stackRows[y-1].push(tk);
            stackColumns[x-1].push(tk);
            if(y-1===x-1) diagonal[0].push(tk);
            if(y+x-2=== 3-1 ) diagonal[1].push(tk);
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
        //console.log(a, aPt," : ",b,bPt);
        return {"ra":aPt, "rb":bPt};
    }

    function DrawTable(){
        console.table(table);
    }

    function isOver(){
        debugger;
        
        let rows=[...stackRows,...stackColumns,...diagonal];
        rows=rows.filter((x)=>x.length===3);
        
        for(const x of rows){
            if(x[0].palo===x[1].palo && x[1].palo===x[2].palo){
                winning.push(...x);
                //three in line
                debugger;
                if(x[0].palo===aPalo){
                    aWins();
                }else{
                    bWins();
                }
                completed=true;
                return true;
            }
        } 
        if(rows.length===7){
            //the board is completed
            completed=true;
            return true;
        }

        return false;
    }

    function getWinningLine(){
        return winning;
    }

    return {getResult, DrawTable, Play, isOver, reset, getWinningLine}
}

       
//#region gameLogic

var game=createGame("X","O");
let currentPlayer=0;



function updateResult(){
    const p1wins=document.querySelectorAll(".p1-wins");
    const p2wins=document.querySelectorAll(".p2-wins");
    const result=game.getResult();

    p1wins.forEach(e=>{
      e.innerText=result["ra"];  
    });
    p2wins.forEach(e=>{
        e.innerText=result["rb"];
    })
    
}


//#region clickOnBoard
let gato=document.querySelector(".gato");
updateResult();
gato.addEventListener("click", (event)=>{
    event.preventDefault();

    let pos;
    try{
        pos=event.target.getAttribute("data-pos");
        pos=pos.split(",");
    }catch(error){
        return;
    }
    let palo=currentPlayer===0?"✖":"◯";

    debugger;

    if(game.Play(palo,pos[0],pos[1])){
        event.target.innerText=palo;
        currentPlayer = (currentPlayer+1)%2;
        if(game.isOver()){
            const winningLine= game.getWinningLine();
            const tiles= document.querySelectorAll(".element");
            tiles.forEach(x=>{
                for(const v of winningLine){
                    const s=[v.x,v.y].join();
                    if(s===x.getAttribute("data-pos")){
                        x.classList.add("win");
                    }
                }
            });
            updateResult();
        }

    }
});
function clearScreen(){
    const tiles=document.querySelectorAll(".element");
    tiles.forEach(x=>{
        x.innerText="";
        x.classList.remove("win");
    });
    updateResult();

}
const newGame=document.querySelector("#ngame");
newGame.addEventListener("click",(event)=>{
    event.preventDefault();
    game=createGame("X","0");
    clearScreen();
});
//#endregion clickOnBoard

const rematch=document.querySelector("#reMatch");
rematch.addEventListener("click",(event)=>{
    event.preventDefault();
    game.reset();
    clearScreen();
    //game.DrawTable();
})

const closeModalBtn = document.getElementById("closeModalBtn");
const myModal = document.getElementById("myModal"); // Get the dialog element
const quit=document.querySelector("#quit");

quit.addEventListener("click", () => {
    myModal.showModal(); // showModal() method opens as a modal dialog







//#endregion


});

// Close the modal (the form method="dialog" handles basic closing, but this is explicit)
closeModalBtn.addEventListener("click", () => {
    myModal.close();
});