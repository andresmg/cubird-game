class Board {
  constructor(cards) {
    this.cards = cards
  }

  shuffleCards() {
    if (!this.cards) return undefined

    for (let i = 0; i < this.cards.length; i++) {
      const num = Math.floor(Math.random() * i)
      const tempArray = this.cards[i]
      this.cards[i] = this.cards[num]
      this.cards[num] = tempArray
    }
  }

  updateLefties() {
    const lefties = document.querySelector(".lefties .badge")
    lefties.innerText = this.cards.length
  }

  addClickable() {
    const clickable = document.createElement("div")
    clickable.classList.add("col-2", "clickable")

    const badge = document.createElement("span")
    badge.className = "badge"

    clickable.appendChild(badge)

    return clickable
  }

  addCardsRow() {
    const boardContent = document.querySelector(".board-content")

    for (let i = 0; i < 4; i++) {
      const gameRow = document.createElement("div")
      gameRow.classList.add("row", "gameRow")

      gameRow.appendChild(this.addClickable())

      if (this.cards.length <= 110) {
        for (let i = 0; i < 3; i++) {
          const birdCard = document.createElement("div")
          birdCard.classList.add("col-2", this.cards[i].name)
          birdCard.setAttribute("name", this.cards[i].name)

          const badge = document.createElement("span")
          badge.className = "badge"

          birdCard.appendChild(badge)
          gameRow.appendChild(birdCard)

          boardContent.appendChild(gameRow)

          this.cards.shift()
        }
      } else {
        throw new Error(
          "YA NO QUEDAN MÁS CARTAS EN EL MAZO, COGER DEL MAZO DE DESECHADOS"
        )
      }

      gameRow.appendChild(this.addClickable())
    }

    this.updateLefties()
  }
}
