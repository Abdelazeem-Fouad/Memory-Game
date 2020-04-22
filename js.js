// start button
document.querySelector(".control-buttons span").addEventListener('click', function(){
    // ask user by prompt
    let yourNAme = prompt('what is your name ')
    //check the name
    if( yourNAme == null || yourNAme == ""){
        document.querySelector(".name span").innerHTML = 'UnKnown';
    }else{
        document.querySelector(".name span").innerHTML = yourNAme;
    }
    //remove overlay from dom
    document.querySelector(".control-buttons").remove();
});

//open all cards



// my variables

let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-block");
let blocks = Array.from(blocksContainer.children);
//create rang of keys
let orderRange = [...Array( blocks.length).keys()];
shuffle(orderRange);
//add.Order.css.property.to GAme
blocks.forEach((block, index)=>{

    block.style.order = orderRange[index];

    block.addEventListener('click', function(){
        flipBLock(block);
    })
})

//Flip function
function flipBLock(selectedBlock){

    //add class is-flip
    selectedBlock.classList.add("is-flipped")

    //collect all flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // if theres two selected blocks 
    if(allFlippedBlocks.length === 2 ){
        
        //stop clicking function
        stopClicking();
        

        //Matched function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
} 


//stop clicking function
function stopClicking(){
    blocksContainer.classList.add('no-clicking')
    // run after 1 mn
    setTimeout(() =>{
        blocksContainer.classList.remove('no-clicking')
    },duration);
} 


// check matched block
function checkMatchedBlocks (firstBlock,secondBlock){
    let triesElement = document.querySelector('.tries span');
    if(firstBlock.dataset.player === secondBlock.dataset.player){
        firstBlock.classList.remove("is-flipped")
        secondBlock.classList.remove("is-flipped")

        firstBlock.classList.add("has-matched")
        secondBlock.classList.add("has-matched")
        document.getElementById('success').play();

    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1
        
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped")
            secondBlock.classList.remove("is-flipped")
        },duration)
        document.getElementById('fail').play();
    }

}


//shuffle function
function shuffle(array){
    let current = array.length,
        temp,
        random;

        while(current > 0){
            //get Number Random
            random = Math.floor(Math.random() * current);   
            //decrease length by one
            current--;
            //save current Element in stash
            temp = array[current];
            //current = random
            array[current] = array[random];
            //random = get element from stash
            array[random] = temp;
        }
        return array;

        
}

