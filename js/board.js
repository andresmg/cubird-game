class Board {
  constructor(cards) {
    this.cards = cards
    this.playersNames = JSON.parse(localStorage.getItem("playersNames"))
  }

  _remainDeck() {
    const deck = document.querySelector(".deck .badge")
    deck.innerText = this.cards.length
  }

  _addEmptyCard() {
    const emptyCard = document.createElement("div")
    emptyCard.classList.add("col-2", "clickable")

    const badge = document.createElement("span")
    badge.className = "badge"

    emptyCard.appendChild(badge)

    return emptyCard
  }

  _addBirdCard(arr) {
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

  _updatePlayerCards(arr, parentElement) {
    const birdObj = arr.reduce((acc, name) => {
      acc[name] = (acc[name] || 0) + 1
      return acc
    }, {})

    Object.entries(birdObj).forEach(([key, value]) => {
      const birdCard = document.createElement("div")
      birdCard.classList.add("col-2", key)
      birdCard.setAttribute("name", key)

      this._birdMinMax(birdCard, key)

      const badge = document.createElement("span")
      badge.innerText = 1

      if (value > 1) {
        badge.innerText = value
        badge.className = "badge"
      }

      birdCard.appendChild(badge)
      parentElement.appendChild(birdCard)
    })

    const objLength = Object.keys(birdObj).length
    if (!(objLength === 8)) {
      for (let i = 0; i < 8 - objLength; i++) {
        parentElement.appendChild(this._addEmptyCard())
      }
    }
  }

  _birdMinMax(birdCard, el) {
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

      playerBlock.classList.add("player-block", `player${i}`)
      playerBlock.setAttribute("id", `player${i}`)

      if (i === 2) {
        playerBlock.classList.add("hide")
      }

      const player = document.createElement("h1")
      if (el) {
        player.innerText = `${el}'s deck`
        i++
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

      this._updatePlayerCards(birdsArr, rowCards)

      const newDiv = document.createElement("div")
      newDiv.classList.add("col", "justify-content-end", "d-flex")

      const updateCollectionBtn = document.createElement("button")
      updateCollectionBtn.classList.add("update-collection-btn")
      updateCollectionBtn.setAttribute("type", "button")
      updateCollectionBtn.setAttribute("data-target", `player${i - 1}`)
      updateCollectionBtn.innerText = "Add to my flocks!"

      document.querySelectorAll("button").forEach((el) => {
        el.disabled = true
        el.classList.add("disabled")
      })

      newDiv.appendChild(updateCollectionBtn)

      playerBlock.appendChild(newDiv)

      this._remainDeck()
    })
  }

  initPlayersBands() {
    const carouselInner = document.querySelector(".carousel-inner")
    let i = 1
    this.playersNames.forEach((el) => {
      const carouselItem = document.createElement("div")
      carouselItem.classList.add("carousel-item", `player${i}`)

      const player = document.createElement("h4")
      if (el) {
        player.innerText = `${el}'s flocks`
        i++
      } else {
        player.innerText = `Player ${i}'s flocks`
        i++
      }

      carouselInner.appendChild(carouselItem)
      carouselItem.appendChild(player)

      const rowCards = document.createElement("div")
      rowCards.classList.add("row", "cards")

      carouselItem.appendChild(rowCards)
      rowCards.appendChild(this._addBirdCard(this.cards))

      for (let i = 0; i < 7; i++) {
        rowCards.appendChild(this._addEmptyCard())
      }
    })

    document.querySelector(".carousel-item").classList.add("active")
  }

  addCardsRow() {
    const boardContent = document.querySelector(".board-content")
    for (let i = 0; i < 4; i++) {
      const gameRow = document.createElement("div")
      gameRow.classList.add("row", "gameRow")

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
        this._birdMinMax(birdCard, uniqueArr[i])

        const badge = document.createElement("span")
        badge.className = "badge"

        birdCard.appendChild(badge)
        gameRow.appendChild(birdCard)
      }

      boardContent.appendChild(gameRow)
      gameRow.appendChild(this._addEmptyCard())
    }

    this._remainDeck()
  }

  initCollectBirds() {
    let playerBlock = document.querySelector(".player-deck")
    let players = playerBlock.querySelectorAll(".player-block")

    players.forEach((currentPlayer) => {
      let selectedBird
      let playerBirds = currentPlayer.querySelectorAll("[name]")

      //SE AÑADE UN EVENTO CLICK EN LA CARTA SELECCIONADA POR EL JUGADOR
      playerBirds.forEach((currentPlayerCard) => {
        currentPlayerCard.addEventListener(
          "click",
          (event) => this._getPosibleBirds(selectedBird),
          false
        )
      })
    })
  }

  _getPosibleBirds(selectedBird) {
    selectedBird = event.target

    const getCurrentPlayerId = selectedBird
      .closest(".player-block")
      .getAttribute("id")

    let selectedCard = document.querySelector(".selected")
    if (selectedCard) {
      selectedCard.classList.remove("selected")
    }

    selectedBird.classList.add("selected")
    let nameAtt = selectedBird.getAttribute("name")
    let posibles = document.querySelectorAll(`.board-content .${nameAtt}`)
    let resetPosibles = document.querySelectorAll(".posibles")

    if (resetPosibles) {
      resetPosibles.forEach((el) => {
        el.classList.remove("posibles")
      })
    }

    if (posibles) {
      posibles.forEach((currentPosible) => {
        let posiblesParents = currentPosible.closest(".gameRow")
        let clickableSons = posiblesParents.querySelector(".clickable")
        clickableSons.classList.add("posibles")

        let posibleBirds
        clickableSons.addEventListener(
          "click",
          (event) =>
            this._collectBirdsAndUpdate(
              posibleBirds,
              getCurrentPlayerId,
              selectedBird
            ),
          false
        )
      })
    }
  }

  _collectBirdsAndUpdate(posibleBirds, getCurrentPlayerId, selectedBird) {
    posibleBirds = event.target

    const birdsToStealRow = posibleBirds.closest(".gameRow")

    //Se cogen las cartas "robadas" de la fila
    let stealedBirds = []
    birdsToStealRow.querySelectorAll("[name]").forEach((bird) => {
      stealedBirds.push(bird.getAttribute("name"))
    })
    console.log(stealedBirds)

    //Se agregan nuevas celdas vacías a cada fila donde hubo posibilidad de robar
    document.querySelectorAll(".posibles").forEach((el) => {
      const newEmptyCard = el.closest(".gameRow")
      el.remove()
      newEmptyCard.appendChild(this._addEmptyCard())
    })

    //Se eliminan los pájaros de la fila seleccionada
    birdsToStealRow.innerHTML = ""

    //Se agregan tres cartas a la fila vacía
    for (let i = 0; i < 3; i++) {
      birdsToStealRow.appendChild(this._addBirdCard(this.cards))
      birdsToStealRow.querySelectorAll("[name]").forEach((el) => {
        el.style.opacity = 0
        setTimeout(() => {
          el.classList.add("appear")
        }, 50 * i)
      })
    }

    this._remainDeck()

    //Se agrega celda vacía a la fila
    birdsToStealRow.appendChild(this._addEmptyCard())

    //Se cogen las cartas del jugador
    let cardsInPlayerDeck = []
    document
      .getElementById(getCurrentPlayerId)
      .querySelectorAll(".cards [name]")
      .forEach((el) => {
        for (let i = 0; i < el.querySelector("span").innerText; i++) {
          cardsInPlayerDeck.push(el.getAttribute("name"))
        }
      })

    //Se actualiza el deck del jugador
    let uniqueArr = cardsInPlayerDeck.concat(stealedBirds)
    document
      .getElementById(getCurrentPlayerId)
      .querySelector(".cards").innerHTML = ""
    const birdObj = this._updatePlayerCards(
      uniqueArr,
      document.getElementById(getCurrentPlayerId).querySelector(".cards")
    )

    //Se activan los botones
    document.querySelectorAll("button").forEach((el) => {
      el.disabled = false
      el.classList.add("enabled")
      el.classList.remove("disabled")
    })

    //Se agrega evento al botón next round
    const nextRoundBtn = document.querySelector(".end-round-btn")
    let nextRound
    nextRoundBtn.addEventListener(
      "click",
      (event) => this._finishRound(nextRound, getCurrentPlayerId),
      false
    )
  }

  addBirdsToCollection() {
    let playerBlock = document.querySelector(".player-deck")
    let players = playerBlock.querySelectorAll(".player-block")

    players.forEach((currentPlayer) => {
      let selectedBtn

      let addToCollectionBtn = currentPlayer.querySelector(
        ".update-collection-btn"
      )

      addToCollectionBtn.addEventListener("click", (event) => {
        selectedBtn = event.target

        let playerBirds = currentPlayer.querySelectorAll("[name]")
        let currentId = selectedBtn.getAttribute("data-target")
        let noYetMessage = document.querySelector(".no-yet")
        if (noYetMessage) {
          noYetMessage.remove()
        }

        let push = false
        let playerBirdArr = []

        playerBirds.forEach((el) => {
          const name = el.getAttribute("name")
          const max = el.getAttribute("data-max")
          const min = el.getAttribute("data-min")
          let span = el.querySelector("span").innerText

          if (span === "") {
            span = 1
          } else {
            span = parseInt(span)
          }

          if (span >= max) {
            push = true
            playerBirdArr.push(name)
            playerBirdArr.push(name)
            for (let i = 0; i < span - 1; i++) {
              this.cards.push({
                name: name,
                min: parseInt(min),
                max: parseInt(max)
              })
              shuffleCards(this.cards)
              this._remainDeck()
            }
            currentPlayer.querySelector(`.cards [name = ${name}]`).remove()
            currentPlayer
              .querySelector(".cards")
              .appendChild(this._addEmptyCard())
          } else if (span >= min && span < max) {
            push = true
            playerBirdArr.push(name)
            for (let i = 0; i < span - 1; i++) {
              this.cards.push({
                name: name,
                min: parseInt(min),
                max: parseInt(max)
              })
              shuffleCards(this.cards)
              this._remainDeck()
            }
            currentPlayer.querySelector(`.cards [name = ${name}]`).remove()
            currentPlayer
              .querySelector(".cards")
              .appendChild(this._addEmptyCard())
          }
        })

        if (!push) {
          const message = document.createElement("div")
          message.classList.add(
            "col",
            "justify-content-end",
            "d-flex",
            "no-yet"
          )
          message.innerText = "WAIT! you don't have enough birds to add!"
          currentPlayer.appendChild(message)
        } else {
          let currentPlayerCollection = document.querySelectorAll(
            `.carousel-item.${currentId} .cards [name]`
          )
          let currentCollection = document.querySelector(
            `.carousel-item.${currentId} .cards`
          )
          currentCollection.innerHTML = ""

          let currentPlayerCollectionArr = []
          currentPlayerCollection.forEach((el) => {
            let elName = el.getAttribute("name")
            let elNum = parseInt(el.querySelector("span").innerText)
            if (elNum > 1) {
              for (let i = 0; i < elNum; i++) {
                currentPlayerCollectionArr.push(elName)
              }
            } else {
              currentPlayerCollectionArr.push(elName)
            }
          })

          console.log(currentPlayerCollectionArr)
          let uniqueArr = playerBirdArr.concat(currentPlayerCollectionArr)
          const birdObj = this._updatePlayerCards(uniqueArr, currentCollection)
        }

        setTimeout(() => {
          this._andTheWinnerIs(currentPlayer)
        }, 200)
      })
    })
  }

  _nextRoundCurtain(getCurrentPlayerId) {
    const nextRound = document.querySelector(".next-round")
    nextRound.classList.add("visible")

    if (getCurrentPlayerId === "player1" && this.playersNames[0] === "") {
      document.querySelector(".next-round h1").innerText = `player 2's turn`
    } else if (
      getCurrentPlayerId === "player1" &&
      this.playersNames[0] !== ""
    ) {
      document.querySelector(
        ".next-round h1"
      ).innerText = `${this.playersNames[1]}'s turn`
    } else if (
      getCurrentPlayerId === "player2" &&
      this.playersNames[1] === ""
    ) {
      document.querySelector(".next-round h1").innerText = `player 1's turn`
    } else if (
      getCurrentPlayerId === "player1" &&
      this.playersNames[0] !== ""
    ) {
      document.querySelector(
        ".next-round h1"
      ).innerText = `${this.playersNames[0]}'s turn`
    }

    const nextBtn = document.querySelector(".next-roundBtn")
    nextBtn.addEventListener(
      "click",
      (event) => {
        if (getCurrentPlayerId === "player2") {
          document
            .querySelector(".carousel-item.player1")
            .classList.add("active")
          document
            .querySelector(".carousel-item.player2")
            .classList.remove("active")
          document.querySelector(".player-block.player2").classList.add("hide")
          document
            .querySelector(".player-block.player1")
            .classList.remove("hide")
        } else {
          document
            .querySelector(".carousel-item.player1")
            .classList.remove("active")
          document
            .querySelector(".carousel-item.player2")
            .classList.add("active")
          document.querySelector(".player-block.player1").classList.add("hide")
          document
            .querySelector(".player-block.player2")
            .classList.remove("hide")
        }

        //Se quita la cortina "next player turn"
        nextRound.classList.add("curtain-up")
        setTimeout(() => {
          nextRound.classList.remove("visible", "curtain-up")
        }, 200)

        //Si hay mensaje de "WAIT" se borra
        const message = document.querySelector(`#${getCurrentPlayerId} .no-yet`)
        if (message) {
          message.remove()
        }
      },
      false
    )
  }

  _finishRound(nextRound, getCurrentPlayerId) {
    nextRound = event.target
    //Se añade otra vez el evenlistener a las cartas nuevas
    document
      .getElementById(getCurrentPlayerId)
      .querySelectorAll(".cards [name]")
      .forEach((el) => {
        el.addEventListener("click", (event) => this._getPosibleBirds(), false)
      })

    document.querySelectorAll(`[class*="-btn"]`).forEach((el) => {
      el.disabled = true
      el.classList.add("disabled")
      el.classList.remove("enabled")
    })

    this._nextRoundCurtain(getCurrentPlayerId)
  }

  _andTheWinnerIs(currentPlayer) {
    console.log("chequeo and the winner is")

    let birdsInBand = 0
    let namesInBand = 0

    //Selecciono los pájaros de la colección del jugador y obtengo su nombre y su número
    const playerCollection = document.querySelectorAll(
      `.carousel-inner .${currentPlayer.getAttribute("id")} .cards [name]`
    )
    playerCollection.forEach((el) => {
      let elName = el.getAttribute("name")
      let elNum = parseInt(el.querySelector("span").innerText)

      if (elNum >= 3) {
        birdsInBand++
      } else if (elName) {
        namesInBand++
      }
    })

    if (birdsInBand >= 2 || namesInBand >= 7) {
      const winner = document.querySelector(".winner")
      winner.classList.add("visible")

      const winnerName = winner.querySelector("h1")
      if (currentPlayer.getAttribute("id") === "player1") {
        if (this.playersNames[0] !== "") {
          winnerName.innerText = this.playersNames[0]
        } else {
          winnerName.innerText = currentPlayer.getAttribute("id")
        }
      } else if (currentPlayer.getAttribute("id") === "player2") {
        if (this.playersNames[1] !== "") {
          winnerName.innerText = this.playersNames[1]
        } else {
          winnerName.innerText = currentPlayer.getAttribute("id")
        }
      }
    }
  }
}
