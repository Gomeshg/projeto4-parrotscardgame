const $container = document.querySelector('.container');
let $card = '';

let num_cards = 0;
let final_list = []
let list_gifs = [
    'bobrossparrot', 
    'explodyparrot', 
    'fiestaparrot', 
    'metalparrot', 
    'revertitparrot', 
    'tripletsparrot', 
    'unicornparrot'
]

window.onload = init_game;


function init_game(){

    
    while(true){
        num_cards = prompt('Com quantas cartas você quer jogar ? (Insira apenas números pares, de 4 a 14)')

        if(num_cards % 2 === 0){
            if(num_cards >= 4  && num_cards <= 14){
                num_cards = parseInt(num_cards)
                set_random_cards(num_cards, shuffle_list(list_gifs));
                $card = document.getElementsByClassName('card')
                $card = [...$card]
                $card.map(card => card.addEventListener('click', select_card)) 
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


function select_card(e){

    let card = e.currentTarget
    let child_card = card.childNodes

    if(card.classList.contains('selected')){
        child_card[0].style.transform = 'rotateY(0deg)'
        child_card[1].style.transform = 'rotateY(180deg)'
        card.classList.remove('selected')
    }
    else{
        child_card[0].style.transform = 'rotateY(-180deg)'
        child_card[1].style.transform = 'rotateY(0deg)'
        card.classList.add('selected');
    }
}





function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function shuffle_list(list_gifs){

    let final_list = [];

    let cont = list_gifs.length;
    while(true){

        let index = getRandomIntInclusive(0, list_gifs.length-1);
        final_list.push(list_gifs[index])
        list_gifs.splice(index, 1)

        if(cont === final_list.length){
            break;
        }
    }

    return final_list;
}


function set_random_cards(num_cards, list_gifs){
    num_cards = num_cards / 2;
    let list_gif = [];
    let random_list = [];
 
    for(let i = 0; i < num_cards; i++){

        let div_card_parrot1 = document.createElement('div');
        div_card_parrot1.classList.add('card')

        let front_card_parrot1 = document.createElement('div');
        front_card_parrot1.classList.add('face')
        front_card_parrot1.classList.add('front_card')

        let back_card_parrot1 = document.createElement('div');
        back_card_parrot1.classList.add('back_card')
        back_card_parrot1.classList.add('face')



        let div_card_parrot2 = document.createElement('div');
        div_card_parrot2.classList.add('card')

        let front_card_parrot2 = document.createElement('div');
        front_card_parrot2.classList.add('front_card')
        front_card_parrot2.classList.add('face')

        let back_card_parrot2 = document.createElement('div');
        back_card_parrot2.classList.add('back_card')
        back_card_parrot2.classList.add('face')


        let img_front1 = document.createElement('img');
        img_front1.setAttribute('src', './imagens/front.png')

        let img_gif1 = document.createElement('img');
        img_gif1.setAttribute('src', `./imagens/${list_gifs[i]}.gif`)

        let img_front2 = document.createElement('img');
        img_front2.setAttribute('src', './imagens/front.png')

        let img_gif2 = document.createElement('img');
        img_gif2.setAttribute('src', `./imagens/${list_gifs[i]}.gif`)


        front_card_parrot1.appendChild(img_front1);
        back_card_parrot1.appendChild(img_gif1);
        div_card_parrot1.appendChild(front_card_parrot1);
        div_card_parrot1.appendChild(back_card_parrot1);
        list_gif.push(div_card_parrot1)

        front_card_parrot2.appendChild(img_front2);
        back_card_parrot2.appendChild(img_gif2);
        div_card_parrot2.appendChild(front_card_parrot2);
        div_card_parrot2.appendChild(back_card_parrot2);
        list_gif.push(div_card_parrot2)
    }
    
    random_list.push(shuffle_list(list_gif))
    random_list[0].map( element => $container.appendChild(element)) 
}