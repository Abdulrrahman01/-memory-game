document.querySelector(".control span").onclick = function () {
    
    let yourName = prompt("What Is Your Name");

    if (yourName == null || yourName == "") {
        document.querySelector(".name span").innerHTML = "UnKnown"

    } else{
        document.querySelector(".name span").innerHTML = yourName
    }
    
    document.querySelector(".control").remove()

}

//-------------------------------------------------------------------------------------------------------

let duration = 1000;

let blocksContainer = document.querySelector(".game-container")

let blocks = Array.from(document.querySelectorAll(".game-block"));

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange)

blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    block.addEventListener('click', function () {
        
        flipBlock(block);

    })
});

// Flip Block Function

function flipBlock(selectedBlock) {
    // Add Class To Selected Block
    selectedBlock.classList.add("flipped")
    
    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("flipped"));

    // If 2 selecteed Blocks
    if (allFlippedBlocks.length === 2) {
        
        // Stop Clicking Function 
        stopClicking();

        // Check Matched Block Function
        checkMatchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
    }

}

// Check Matched Block Function
function checkMatchedBlock(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span')

    if (firstBlock.dataset.sajoj === secondBlock.dataset.sajoj ) {
        
        firstBlock.classList.remove('flipped');
        secondBlock.classList.remove('flipped');

        firstBlock.classList.add('matched');
        secondBlock.classList.add('matched');

        document.getElementById('success').play();
        
    }else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        
        setTimeout(()=>{
            firstBlock.classList.remove('flipped');
            secondBlock.classList.remove('flipped');

        }, duration)

        document.getElementById('fail').play();

    }
}
// Stop Clicking Function 
function stopClicking() {

    // Add Class No Clicking On Main Container
    blocksContainer.classList.add('no-clicking');

    // Remove Class No Clicking After Duration
    setTimeout(() => {

        blocksContainer.classList.remove('no-clicking');

    }, duration);
}

function shuffle(array) {
    
    let current = array.length,
        temp,
        random;

    while(current > 0){

        // Get Random Number
        random = Math.floor(Math.random()*current);

        // Decrease Length By One
        current--;

        //[1] Save Current Element in Stach
        temp = array[current];

        // Current Element = Random Element
        array[current] = array[random];

        // Random Element = Get Element From Stach 
        array[random] = temp;


    }

    return array;
}