window.onload = init_game;

function init_game(){

    let num_cards = 0;
    while(true){
        num_cards = prompt('Com quantas cartas você quer jogar ? (Insira apenas números pares, de 4 a 14)')

        if(num_cards % 2 === 0){
            if(num_cards >= 4  && num_cards <= 14){
                break;
            }
            else{
                alert('INSIRA APENAS NÚMEROS ENTRE 4 E 14!')
            }
        }
        else{
            alert('INSIRA APENAS NÚMEROS PARES!')
        }
    }
}