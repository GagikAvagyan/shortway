let boardBlockClassName, boardBlockIdName,  GameBord = [], userPoint = '.', inpVal;

$('.submitBtn').click(function (){   // click for start
    inpVal = +$('.startInpNum').val();
    if( inpVal > 4 && inpVal < 26){
        $('.container').hide();
        $('.blockContainer').css({'min-height':window.innerHeight});
        makeMatrix()
    }
});

function makeMatrix(){
    for ( let i = 0; i < inpVal; i++ ) {   //  make matrix
        GameBord.push([]);
        for (let j = 0; j < inpVal; j++) {
            GameBord[i].push('');
        }
    }
    GameBord[0][0] = 'S';
    printBlocks()
}

function printBlocks() {
    for(let i = 0; i < inpVal; i++){   // Print Blocks
        $('.blockContainer').append( `<div class="GameBordSection${ i } GameBordContent"></div>` );
        for (let j = 0; j < inpVal; j++){
            $(`.GameBordSection${ i }`).append(`<span id="${ i }" class="${ j }"></span>`);
        }
    }
    $('.0#0').text('Start');
    $('.blockContainer').append(' <input type="submit" value="SUBMIT" class="btn-hover btnHoverTime startToFind"> ');
    addEvent();
}

function changeUsePoint(){ // Change Use Point to Wall
    userPoint = 'x';
}

function addEvent(){  // user click
    $('span').click(function (){
        if( userPoint === '.' ){
            boardBlockIdName =  $(this).attr('id');
            boardBlockClassName =  $(this).attr('class');
            $(this).append('<div class="point"></div>');
        }else {
            $(this).append('<div class="wall"></div>')
        }
        GameBord[$(this).attr('id')][$(this).attr('class')] = userPoint;
        changeUsePoint( );
    })

    $('.startToFind').click( function (){
        clearSpan()
        diagonalLeft();
        checkDialogTop();
        checkDialogBottom();
    })
}

function diagonalLeft(){  // check diagonal
    const checkDiagonalLeft = [];
    for(let i = 0; i <GameBord.length; i++){
        for (let j = 0; j < GameBord[i].length; j++){
            i === j ? checkDiagonalLeft.push(GameBord[i][j]) : '';
        }
    }
    if( checkDiagonalLeft.some(x => x === 'x') && checkDiagonalLeft.some(x => x === '.') ){
        for(let i = 0; i <GameBord.length; i++){
            for (let j = 0; j < GameBord[i].length; j++){
                if ( GameBord[i][j] === '.' ){
                    console.log(i + ' ' + j);
                }
            }
        }
    }else if( checkDiagonalLeft.some(x => x === '.') ) {
        for(let i = 0; i <GameBord.length; i++){
            for (let j = 0; j < GameBord[i].length; j++){
               GameBord[i][j] === 'x' ? $(`#${i}.${j}`).append('<div class="wall"></div>') : '';
            }
        }
        while ( boardBlockIdName > -1 && boardBlockClassName > -1 ){
            $(`#${boardBlockIdName}.${boardBlockClassName}`).append('<div class="point"></div>');
            boardBlockIdName --
            boardBlockClassName --
        }
    }
}

function checkDialogTop(){ // checkDialogTop
    let dialogTop = [];
    for( let i = 0; i < GameBord.length; i++){
        dialogTop = []
        for (let j = 0; j < GameBord[i].length; j++){
            i < j ? dialogTop.push(GameBord[i][j]) : '';
        }
        if ( dialogTop.some(x => x === 'x') && dialogTop.some(x => x === '.') ){
            for(let i = 0; i <GameBord.length; i++){
                for (let j = 0; j < GameBord[i].length; j++){
                    if ( GameBord[i][j] === '.' ){
                        console.log(i + ' ' + j);
                    }
                }
            }
        }else if( dialogTop.some(x => x === '.') ){
            for(let i = 0; i <GameBord.length; i++){
                for (let j = 0; j < GameBord[i].length; j++){
                    GameBord[i][j] === 'x' ? $(`#${i}.${j}`).append('<div class="wall"></div>') : '';
                }
            }
            while ( boardBlockIdName > -1 && boardBlockClassName > -1 ){
                $(`#${boardBlockIdName}.${boardBlockClassName}`).append('<div class="point"></div>');
                boardBlockClassName --
                if( boardBlockIdName == boardBlockClassName && boardBlockIdName > 0){
                    while ( boardBlockIdName > -1 && boardBlockClassName > -1 ){
                        $(`#${boardBlockIdName}.${boardBlockClassName}`).append('<div class="point"></div>');
                        boardBlockIdName --
                        boardBlockClassName --
                    }
                }
            }
        }
    }
}

function checkDialogBottom(){ // checkDialogBottom
    let dialogBottom = [];
    for( let i = 1; i < GameBord.length ; i++){
        dialogBottom = []
        for (let j = 0; j < GameBord[i].length; j++){
            i > j ? dialogBottom.push(GameBord[i][j]) : '';
        }
        if ( dialogBottom.some(x => x === 'x') && dialogBottom.some(x => x === '.') ){

        } else if( dialogBottom.some(x => x === '.') ){
            for(let i = 0; i <GameBord.length; i++){
                for (let j = 0; j < GameBord[i].length; j++){
                    GameBord[i][j] === 'x' ? $(`#${i}.${j}`).append('<div class="wall"></div>') : '';
                }
            }
            while ( boardBlockIdName > -1 && boardBlockClassName > -1  ) {
                $(`#${boardBlockIdName}.${boardBlockClassName}`).append('<div class="point"></div>');
                boardBlockIdName --
                if( boardBlockIdName == boardBlockClassName && boardBlockIdName > 0){
                    while ( boardBlockIdName > -1 && boardBlockClassName > -1 ){
                        $(`#${boardBlockIdName}.${boardBlockIdName}`).append('<div class="point"></div>');
                        boardBlockClassName --
                        boardBlockIdName --
                    }
                }
            }
        }
    }
}

function clearSpan(){
    $('.blockContainer').empty();
    printBlocks();
}