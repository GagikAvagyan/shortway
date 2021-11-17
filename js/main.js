let boardBlockClassName, boardBlockIdName,  GameBord = [], userPoint = '1', inpVal;

$('.submitBtn').click(function (){   // click for start
    inpVal = +$('.startInpNum').val();
    if( inpVal > 4 && inpVal < 26){
        $('.container').hide();
        $('.blockContainer').css({'min-height':window.innerHeight});
        makeMatrix()
    }
});

function makeMatrix(){ //  make matrix
    for ( let i = 0; i < inpVal+2; i++ ) {
        GameBord.push([]);
        for (let j = 0; j < inpVal+2; j++) {
            GameBord[i].push(' ');
        }
    }

    for(let i = 0; i <GameBord.length; i++){ // add matrix Border
        for (let j = 0; j < GameBord[i].length; j++){
            if(GameBord[0][j] !== 'x'){
                GameBord[0][j] = 'x';
                GameBord[inpVal+1][j] = 'x'
            }
            if(GameBord[i][0] !== 'x'){
                GameBord[i][0] = 'x'
                GameBord[i][inpVal+1] = 'x'
            }
        }
    }
    printBlocks()
}

function printBlocks() {  // Print Blocks
    for(let i = 1; i < inpVal+1; i++){
        $('.blockContainer').append( `<div class="GameBordSection${ i } GameBordContent"></div>` );
        for (let j = 1; j < inpVal+1; j++){
            $(`.GameBordSection${ i }`).append(`<span id="${ i }" class="${ j }"></span>`);
        }
    }
    // $('.1#1').text('Start');
    $('.blockContainer').append(' <input type="submit" value="SUBMIT" class="btn-hover btnHoverTime startToFind"> ');
    addEvent();
}

function addEvent(){  // user click
    $('span').click(function (){
        if( userPoint === '1' ){
            boardBlockIdName =  $(this).attr('id');
            boardBlockClassName =  $(this).attr('class');
            $(this).append('<div class="point"></div>');
        }else {
            $(this).append('<div class="wall"></div>');
            GameBord[$(this).attr('id')][$(this).attr('class')] = userPoint;
        }
        changeUsePoint( );
    })

    $('.startToFind').click( function (){ // startToFind button
        clearSpan()
        startToFindWay();
    })
}

function changeUsePoint(){ // Change Use Point to Wall
    userPoint = 'x';
}

function startToFindWay(){  // startToFindWay function

    while ( GameBord[1][1] !== '1' ){
        if( GameBord[boardBlockIdName][boardBlockClassName] !== 'x' ){ // responsive for top step
            GameBord[boardBlockIdName][boardBlockClassName] = '1';
            boardBlockIdName --;
        } else if( GameBord[boardBlockIdName][boardBlockClassName] === 'x' ){
            if( GameBord[boardBlockIdName +1][boardBlockClassName -1] === ' '){ // responsive for left step
                boardBlockClassName --;
                boardBlockIdName ++;
                GameBord[boardBlockIdName][boardBlockClassName] = '1';
            }
            else if( GameBord[boardBlockIdName][boardBlockClassName] === 'x' && GameBord[boardBlockIdName +1][boardBlockClassName +1] !== 'x'){ // responsive for right step
                boardBlockIdName ++;
                boardBlockClassName ++;
                GameBord[boardBlockIdName][boardBlockClassName] = '1';
            }
            else if( GameBord[boardBlockIdName +1][boardBlockClassName +1] === 'x') {
                boardBlockIdName ++;
                boardBlockClassName ++;
                GameBord[boardBlockIdName+1][boardBlockClassName] = '1';
            }
            else {
                alert('bottom')
            }
        }
    }

    for( let i = 1; i < GameBord.length ; i++){
        for (let j = 1; j < GameBord[i].length; j++){
            GameBord[i][j] === 'x' ? $(`#${i}.${j}`).append('<div class="wall"></div>') : '';
            GameBord[i][j] === '1' ? $(`#${i}.${j}`).append('<div class="point"></div>') : '';
        }
    }
}

function clearSpan(){
    $('.blockContainer').empty();
    printBlocks();
}
