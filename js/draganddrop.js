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

    return emptyCard
  }

  addBirdCard(arr) {
    const birdCard = document.createElement("div")
    birdCard.classList.add("col-2", arr[0].name)
    birdCard.setAttribute("name", arr[0].name)
    birdCard.setAttribute("data-max", arr[0].max)
    birdCard.setAttribute("data-min", arr[0].min)

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

  birdMinMax(birdCard, el) {
    switch (el) {
      case "bird":
        birdCard.setAttribute("data-min", "6")
        birdCard.setAttribute("data-max", "9")
        break

      case "tucan":
        birdCard.setAttribute("data-min", "3")
        birdCard.setAttribute("data-max", "4")
        break

      case "parrot":
        birdCard.setAttribute("data-min", "4")
        birdCard.setAttribute("data-max", "6")
        break

      case "flamingo":
        birdCard.setAttribute("data-min", "2")
        birdCard.setAttribute("data-max", "3")
        break

      case "large":
        birdCard.setAttribute("data-min", "6")
        birdCard.setAttribute("data-max", "9")
        break

      case "duck":
        birdCard.setAttribute("data-min", "4")
        birdCard.setAttribute("data-max", "6")
        break

      case "mockingbird":
        birdCard.setAttribute("data-min", "5")
        birdCard.setAttribute("data-max", "7")
        break

      case "owl":
        birdCard.setAttribute("data-min", "3")
        birdCard.setAttribute("data-max", "4")
        break
    }
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

        this.birdMinMax(birdCard, key)

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
      gameRow.classList.add("row", "gameRow", "player-block")

      const leftEmptyCard = document.createElement("div")
      leftEmptyCard.classList.add("col-2", "clickable")
      leftEmptyCard.setAttribute("name", "")

      gameRow.appendChild(leftEmptyCard)

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
        this.birdMinMax(birdCard, uniqueArr[i])

        const badge = document.createElement("span")
        badge.className = "badge"

        birdCard.appendChild(badge)
        gameRow.appendChild(birdCard)

        boardContent.appendChild(gameRow)
      }

      const rightEmptyCard = document.createElement("div")
      rightEmptyCard.classList.add("col-2", "clickable")
      rightEmptyCard.setAttribute("name", "")

      gameRow.appendChild(rightEmptyCard)
    }

    this.remainDeck()
  }

  initDragDrop() {
    let dragged
    document.querySelectorAll(".player-block [name]").forEach((el) => {
      el.setAttribute("draggable", "true")

      el.addEventListener("drag", function (event) {}, false)

      el.addEventListener(
        "dragstart",
        (event) => {
          dragged = event.target
          console.log(dragged)
          //ESTILOS DE LA TARJETA QUE QUEDA EN EL DECK DEL JUGADOR
          event.dataTransfer.setData("text/plain", null)
        },
        false
      )

      el.addEventListener(
        "dragend",
        function (event) {
          //CONVERTIR EL BIRDCARD A CLICKABLE
        },
        false
      )

      el.addEventListener(
        "dragover",
        function (event) {
          // prevent default to allow drop
          event.preventDefault()
        },
        false
      )

      el.addEventListener(
        "dragenter",
        function (event) {
          // highlight potential drop target when the draggable element enters it
          event.target.style.background = "purple"
          if (event.target.className == "clickable") {
          }
        },
        false
      )

      el.addEventListener(
        "dragleave",
        function (event) {
          // reset background of potential drop target when the draggable element leaves it
          event.target.style.background = ""
          if (event.target.className == "clickable") {
          }
        },
        false
      )

      el.addEventListener(
        "drop",
        function (event) {
          // prevent default action (open as link for some elements)
          event.preventDefault()
          // move dragged elem to the selected drop target

          dragged.parentNode.removeChild(dragged)

          console.log(dragged.parentNode)

          event.target.appendChild(dragged)

          console.log(event.target)
        },
        false
      )
    })
  }
}
