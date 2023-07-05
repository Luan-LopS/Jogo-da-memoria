const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"
var score = document.getElementById("totalMoves")


function newGame(){
    stardGame()
    let home = document.getElementById("home")
    home.style.display = 'none'
}

function stardGame() {
    initializeCards(game.createCardsFromTechs())
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard")
    gameBoard.innerHTML = ''
    game.cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id
        cardElement.classList.add(CARD)
        cardElement.dataset.icon = card.icon

        createCardContent(card, cardElement)

        cardElement.addEventListener('click', flipCard)
        gameBoard.appendChild(cardElement)
    })

}

function createCardContent(card, cardElement) {
    createCardFace(FRONT, card, cardElement)
    createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div')
    cardElementFace.classList.add(face)
    if (face === FRONT) {
        let iconElement = document.createElement('img')
        iconElement.classList.add(ICON)
        iconElement.src = "./images/" + card.icon + ".png"
        cardElementFace.appendChild(iconElement)
    } else {
        cardElementFace.innerHTML = "&lt/&gt"
    }
    element.appendChild(cardElementFace)
}


function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add("flip")
        if (game.secondCard) {
            let numberGame = document.getElementById("number")
            let counter = document.getElementById("counter")
            var total = numberGame.innerHTML ++
            counter.style.background = 'red'
            setTimeout(()=>{
                counter.style.background = ''
            },400)

            if (game.checkMatch()) {
                game.clearCards()
                counter.style.background = 'green'
                score.innerHTML = ''
                setTimeout(()=>{
                    counter.style.background = ''
                },400)
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver")
                    gameOverLayer.style.display = 'flex'
                    score.innerHTML = Number(score.innerHTML)+ total
                    numberGame.innerHTML = 0 
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id)
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip')
                    secondCardView.classList.remove('flip')
                    game.unflipCards()
                }, 1000)
            }
        }
    }

}

function restart(){
    stardGame()
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = 'none'
}
