window.onload = init_game;
let num_cards = 0;
let final_list = []

const list_gifs = [
    'bobrossparrot', 
    'explodyparrot', 
    'fiestaparrot', 
    'metalparrot', 
    'revertitparrot', 
    'tripletsparrot', 
    'unicornparrot'
]

function init_game(){

    
    while(true){
        num_cards = prompt('Com quantas cartas você quer jogar ? (Insira apenas números pares, de 4 a 14)')

        if(num_cards % 2 === 0){
            if(num_cards >= 4  && num_cards <= 14){
                final_list.push(get_gifs(num_cards, list_gifs));
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


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function get_gifs(num_cards, list_gifs){

    num_cards = num_cards / 2;
    let list_gifs_temp = list_gifs;
    let final_list = []

    for(let i = 0; i < num_cards; i++){

        let index = getRandomIntInclusive(0, list_gifs_temp.length-1);
        final_list.push(list_gifs_temp[index])
        list_gifs_temp.splice(index, 1)
    }

    return final_list;
}


// function set_random_cards(final_list){

// }

const template_card = 
`<div class="card_parrot">
    <div class="front_card_parrot" data-identifier="card">
        <img class="img_parrot" src="./imagens/${1}.gif" alt="Parrot">
    </div>

    <div class="back_card_parrot" data-identifier="back-face"></div>
</div>`;