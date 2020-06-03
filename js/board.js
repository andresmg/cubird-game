class Board {
  constructor(cards) {
    this.cards = cards
    this.playersNames = []
  }

  remainDeck() {
    const deck = document.querySelector(".deck .badge")
    deck.innerText = this.cards.length
  }

  addEmptyCard() {
    const emptyCard = document.createElement("div")
    emptyCard.classList.add("col-2", "clickable")

    const badge = document.createElement("span")
    badge.className = "badge"

    emptyCard.appendChild(badge)

    return emptyCard
  }

  getPlayersNames() {
    const url = new URL(window.location.href)
    this.playersNames.push(url.searchParams.get("player1"))
    this.playersNames.push(url.searchParams.get("player2"))
  }

  initPlayersDeck() {
    const playerDeck = document.querySelector(".player-deck")
    let i = 1
    this.playersNames.forEach((el) => {
      const playerBlock = document.createElement("div")
      playerBlock.classList.add("player-block")
      const player = document.createElement("h1")
      if (el) {
        player.innerText = `Cartas de ${el}`
      } else {
        player.innerText = `Cartas del jugador ${i}`
        i++
      }

      playerDeck.appendChild(playerBlock)
      playerBlock.appendChild(player)

      const rowCards = document.createElement("div")
      rowCards.classList.add("row", "cards")

      playerBlock.appendChild(rowCards)

      for (i = 0; i < 8; i++) {
        const birdCard = document.createElement("div")
        birdCard.classList.add("col-2", this.cards[i].name)
        birdCard.setAttribute("name", this.cards[i].name)

        const badge = document.createElement("span")
        badge.className = "badge"

        birdCard.appendChild(badge)
        this.cards.shift()
        rowCards.appendChild(birdCard)
      }

      this.remainDeck()
    })
  }

  initPlayersBands() {
    const carouselInner = document.querySelector(".carousel-inner")
    let i = 1
    this.playersNames.forEach((el) => {
      const carouselItem = document.createElement("div")
      carouselItem.classList.add("carousel-item")
      const player = document.createElement("h4")
      if (el) {
        player.innerText = `Colecciones de ${el}`
      } else {
        player.innerText = `Colecciones del jugador ${i}`
        i++
      }

      carouselInner.appendChild(carouselItem)
      carouselItem.appendChild(player)

      const birdCard = document.createElement("div")
      birdCard.classList.add("col-2", this.cards[0].name)
      birdCard.setAttribute("name", this.cards[0].name)

      const badge = document.createElement("span")
      badge.className = "badge"

      birdCard.appendChild(badge)
      this.cards.shift()

      const rowCards = document.createElement("div")
      rowCards.classList.add("row", "cards")

      carouselItem.appendChild(rowCards)
      rowCards.appendChild(birdCard)

      for (let i = 0; i < 7; i++) {
        rowCards.appendChild(this.addEmptyCard())
      }
    })

    document.querySelector(".carousel-item").classList.add("active")
  }

  addCardsRow() {
    const boardContent = document.querySelector(".board-content")

    for (let i = 0; i < 4; i++) {
      const gameRow = document.createElement("div")
      gameRow.classList.add("row", "gameRow")

      gameRow.appendChild(this.addEmptyCard())

      for (let j = 0; j < 3; j++) {
        const birdCard = document.createElement("div")
        birdCard.classList.add("col-2", this.cards[j].name)
        birdCard.setAttribute("name", this.cards[j].name)

        const badge = document.createElement("span")
        badge.className = "badge"

        birdCard.appendChild(badge)
        this.cards.shift()

        gameRow.appendChild(birdCard)
        boardContent.appendChild(gameRow)
      }

      gameRow.appendChild(this.addEmptyCard())
    }

    this.remainDeck()
  }
}
