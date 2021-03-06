const $container = document.querySelector('.container');
const $clock = document.querySelector('.clock')

let $card = '';
let _class = [];
let _card = '';
let round = 0;
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
                num_cards = parseInt(num_cards);
                set_random_cards(num_cards, shuffle_list(list_gifs));
                $card = get_elementsByClassName('card');
                add_event($card, 'click', game);
                add_event($card, 'click', condition_win)
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


async function condition_win(){
    await sleep(500)
    let $win = document.getElementsByClassName('win');
    let final_time = format_final_time($clock.textContent);
    if ($win.length === num_cards){
        remove_event($card, 'click', condition_win)
        await sleep(1000);
        alert(`Você ganhou em ${round} rodadas e em ${final_time}!`);

        while(true){
            let desire = prompt('Você deseja jogar novamente? (sim/não)');
            if(desire === 'sim'){
                document.location.reload(true);
                break;
            }
            else if( desire === 'não'){
                alert('Obrigado por jogar com a gente!')
                clearInterval(clock)
                break;
            }
            else{
                alert("Digite apenas 'sim' ou 'não', quaisquer dígitos diferentes não serão aceitos! ")
            }
        }
    }
}


async function game(e){

    let card = e.currentTarget
    
    if(_class.length === 1){
        
        if(_class[0] === get_gifClasse(card)){

            if(get_gifType(_card) !== get_gifType(card)){
                round++;
                gif_up(card)
    
                card.removeEventListener('click', game)
                _card.removeEventListener('click', game)
                card.classList.add('win')
                _card.classList.add('win')
    
                _class.pop()
                _card = ''
            }
        }
        else{
            round++;

            gif_up(card)   

            remove_event($card, 'click', game)
            await sleep(1000)
            gif_down(_card) 
            gif_down(card) 
            add_event($card, 'click', game)
            
            _class.pop() 
            _card = ''
        }
    }
    else{
        round++;
        _class.push(get_gifClasse(card))
        _card = card

        gif_up(card)        
    }
}


function get_gifClasse(card){

    let classe = card.getAttribute('class')
    classe = classe.split(' ')[1]
    return classe;
}

function get_gifType(card){

    let classe = card.getAttribute('class')
    classe = classe.split(' ')[2]
    return classe;
}


function get_elementsByClassName(card){

    let $card = document.getElementsByClassName(card)
    $card = [...$card]
    return $card;
}


function add_event(cards, event, action){

    cards.map( card => card.addEventListener(event, action))
}

function remove_event(cards, event, action){

    cards.map( card => card.removeEventListener(event, action))
}


function gif_up(card){
    card = card.childNodes
    card[0].style.transform = 'rotateY(-180deg)'
    card[1].style.transform = 'rotateY(0deg)'
}


function gif_down(card){
    card = card.childNodes
    card[0].style.transform = 'rotateY(0deg)'
    card[1].style.transform = 'rotateY(180deg)'
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
        div_card_parrot1.classList.add(`${list_gifs[i]}`)
        div_card_parrot1.classList.add('1')

        let front_card_parrot1 = document.createElement('div');
        front_card_parrot1.classList.add('face')

        let back_card_parrot1 = document.createElement('div');
        back_card_parrot1.classList.add('back_card')
        back_card_parrot1.classList.add('face')


        let div_card_parrot2 = document.createElement('div');
        div_card_parrot2.classList.add('card')
        div_card_parrot2.classList.add(`${list_gifs[i]}`)
        div_card_parrot1.classList.add('2')

        let front_card_parrot2 = document.createElement('div');
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


function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


let clock = setInterval(time, 1000)
let min = 0;
let seg = 0;


function time(){

    seg++;

    if(seg === 60){
        seg = 0;
        min++;
    }

    else if(min === 60){
        seg = 0;
        min = 0;
    }

    $clock.textContent= `${format_time(min)}:${format_time(seg)}`
}


function format_time(time){
    return time < 10 ? `0${time}`: time;
}


function format_final_time(time){

    let box = time.split(':')
    let min = parseInt(box[0])
    let seg = parseInt(box[1])

    if(min === 1){
        min = `${min} minuto`
    }
    else if(min > 1){
        min = `${min} minutos`
    }

    if(seg === 1){
        seg = `${seg+1} segundo`
    }
    else if(seg != 1){
        seg = `${seg+1} segundos`
    }

    if(min === 0){
        return seg;
    }
    else{
        return `${min} e ${seg}`
    }
}