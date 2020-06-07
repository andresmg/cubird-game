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
        player.innerText = `${el}'s deck`
      } else {
        player.innerText = `Player ${i}'s deck`
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
        badge.innerText = 1

        if (value > 1) {
          badge.innerText = value
          badge.className = "badge"
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
        player.innerText = `${el}'s collection`
      } else {
        player.innerText = `Player ${i}'s collection`
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
        this.birdMinMax(birdCard, uniqueArr[i])

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

  initCollectBirds() {
    const playerBlock = document.querySelector(".player-deck")
    const players = playerBlock.querySelectorAll(".player-block")

    players.forEach((currentPlayer) => {
      let selectedBird
      let current

      const playerBirds = currentPlayer.querySelectorAll("[name]")
      playerBirds.forEach((currentPlayerCard) => {
        currentPlayerCard.addEventListener(
          "click",
          (event) => {
            selectedBird = event.target

            const selectedCard = document.querySelector(".selected")
            if (selectedCard) {
              selectedCard.classList.remove("selected")
            }
            selectedBird.classList.add("selected")
            const nameAtt = selectedBird.getAttribute("name")

            const posibles = document.querySelectorAll(
              `.board-content .${nameAtt}`
            )

            const resetPosibles = document.querySelectorAll(".posibles")

            if (posibles) {
              resetPosibles.forEach((currentPlayerCard) => {
                currentPlayerCard.classList.remove("posibles")
              })
              posibles.forEach((currentPlayerCard) => {
                const posiblesParents = currentPlayerCard.closest(".gameRow")
                const clickableSons = posiblesParents.querySelectorAll(
                  ".clickable"
                )

                clickableSons.forEach((son) => {
                  son.classList.add("posibles")

                  son.addEventListener(
                    "click",
                    (event) => {
                      current = event.target

                      const selectedBirdsRow = current
                        .closest(".gameRow")
                        .querySelectorAll("[name]")

                      selectedBirdsRow.forEach((son) => {
                        //se limpia la fila seleccionada
                        son.remove()

                        //se añade tres nuevas cartas del deck
                        const gameRow = current.closest(".gameRow")
                        gameRow.appendChild(this.addBirdCard(this.cards))
                        this.remainDeck()
                      })

                      //se añade un empty a la fila
                      current
                        .closest(".gameRow")
                        .appendChild(this.addEmptyCard())

                      //se elimina el primer clickable de la fila, se setean los posibles y el selected del jugador
                      current.closest(".clickable").remove()
                      const cleanPosibles = document.querySelectorAll(
                        ".posibles"
                      )
                      cleanPosibles.forEach((son) => {
                        son.classList.remove("posibles")
                      })

                      const selectedCard = document.querySelector(".selected")
                      selectedCard.classList.remove("selected")

                      const playerBirdsArr = []
                      playerBirds.forEach((el) => {
                        playerBirdsArr.push(el.getAttribute("name"))
                      })

                      const selectedBirdsRowArr = []
                      selectedBirdsRow.forEach((el) => {
                        selectedBirdsRowArr.push(el.getAttribute("name"))
                      })

                      console.log(playerBirdsArr)
                      console.log(selectedBirdsRowArr)
                      const newBirdToPlayer = []

                      selectedBirdsRowArr.forEach((rowBirdName) => {
                        if (playerBirdsArr.includes(rowBirdName)) {
                          //se actualizan las cartas iguales del jugador
                          const currentBirdSpan = parseInt(
                            currentPlayer.querySelector(`.${rowBirdName} span`)
                              .innerText
                          )

                          currentPlayer.querySelector(
                            `.${rowBirdName} span`
                          ).innerText = currentBirdSpan + 1

                          currentPlayer
                            .querySelector(`.${rowBirdName} span`)
                            .classList.add("badge")
                        } else {
                          //Si no existe se añade nuevo pájaro al jugador
                          selectedBirdsRowArr.forEach((el) => {
                            if (!playerBirdsArr.includes(el)) {
                              newBirdToPlayer.push(el)
                            }
                          })
                        }
                      })

                      const newPlayerBirds = [...new Set(newBirdToPlayer)]

                      newPlayerBirds.forEach((el) => {
                        const birdCard = document.createElement("div")
                        birdCard.classList.add("col-2", el)
                        birdCard.setAttribute("name", el)
                        this.birdMinMax(birdCard, el)

                        const badge = document.createElement("span")
                        badge.innerText = 1

                        birdCard.appendChild(badge)

                        currentPlayer
                          .querySelector(".cards")
                          .appendChild(birdCard)
                      })

                      currentPlayer
                        .querySelectorAll(".clickable")
                        .forEach((el) => el.remove())

                      for (
                        let i = 0;
                        i <
                        8 -
                          currentPlayer.querySelectorAll(".cards [name]")
                            .length;
                        i++
                      ) {
                        currentPlayer
                          .querySelector(".cards")
                          .appendChild(this.addEmptyCard())
                      }
                    },
                    false
                  )
                })
              })
            }
          },
          false
        )
      })
    })
  }
}
