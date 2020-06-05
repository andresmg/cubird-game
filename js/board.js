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

  addBirdCard(arr) {
    const birdCard = document.createElement("div")
    birdCard.classList.add("col-2", arr[0].name)
    birdCard.setAttribute("name", arr[0].name)

    const badge = document.createElement("span")
    badge.className = "badge"

    birdCard.appendChild(badge)
    arr.shift()

    return birdCard
  }

  getRepeat(arr) {
    return arr.reduce((acc, name) => {
      acc[name] = (acc[name] || 0) + 1
      return acc
    }, {})
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

      let birdsArr = []
      for (let i = 0; i < 8; i++) {
        birdsArr.push(this.cards[0].name)
        this.cards.shift()
      }

      const birdObj = this.getRepeat(birdsArr)

      Object.entries(birdObj).forEach(([key, value]) => {
        const birdCard = document.createElement("div")
        birdCard.classList.add("col-2", key)
        birdCard.setAttribute("name", key)

        const badge = document.createElement("span")
        badge.className = "badge"

        if (value > 1) {
          badge.innerText = value
        }

        birdCard.appendChild(badge)
        rowCards.appendChild(birdCard)
      })

      const objLength = Object.keys(birdObj).length
      if (!(objLength === 8)) {
        for (let i = 0; i < 8 - objLength; i++) {
          rowCards.appendChild(this.addEmptyCard())
        }
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
        player.innerText = `Colección de ${el}`
      } else {
        player.innerText = `Colección del jugador ${i}`
        i++
      }

      carouselInner.appendChild(carouselItem)
      carouselItem.appendChild(player)

      const rowCards = document.createElement("div")
      rowCards.classList.add("row", "cards")

      carouselItem.appendChild(rowCards)
      rowCards.appendChild(this.addBirdCard(this.cards))

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

      let birdsArr = []
      for (let i = 0; i < 9; i++) {
        birdsArr.push(cards[i].name)
      }

      const uniqueArr = [...new Set(birdsArr)].splice(0, 3)

      for (let i = 0; i < 9; i++) {
        if (uniqueArr[0] === cards[i].name) {
          cards.splice(i, 1)
          break
        }
      }

      for (let i = 0; i < 9; i++) {
        if (uniqueArr[1] === cards[i].name) {
          cards.splice(i, 1)
          break
        }
      }

      for (let i = 0; i < 9; i++) {
        if (uniqueArr[2] === cards[i].name) {
          cards.splice(i, 1)
          break
        }
      }

      for (let i = 0; i < 3; i++) {
        const birdCard = document.createElement("div")
        birdCard.classList.add("col-2", uniqueArr[i])
        birdCard.setAttribute("name", uniqueArr[i])

        const badge = document.createElement("span")
        badge.className = "badge"

        birdCard.appendChild(badge)
        gameRow.appendChild(birdCard)

        boardContent.appendChild(gameRow)
      }

      gameRow.appendChild(this.addEmptyCard())
    }

    this.remainDeck()
  }
}
