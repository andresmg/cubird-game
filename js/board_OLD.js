class Board {
    constructor(cards) {
        this.cards = cards
        this.playersNames = []
        this.playerOne = false
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
            playerBlock.classList.add("player-block", `player${i}`)

            if (i === 2) {
                playerBlock.classList.add("hide")
            }

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

            const newDiv = document.createElement("div")
            newDiv.classList.add("col", "justify-content-end", "d-flex")

            const updateCollectionBtn = document.createElement("button")
            updateCollectionBtn.classList.add("update-collection-btn")
            updateCollectionBtn.setAttribute("type", "button")
            updateCollectionBtn.setAttribute("data-target", `player${i - 1}`)
            updateCollectionBtn.innerText = "Update collection"

            document.querySelectorAll("button").forEach((el) => {
                el.disabled = true
                el.classList.add("disabled")
            })

            newDiv.appendChild(updateCollectionBtn)

            playerBlock.appendChild(newDiv)

            this.remainDeck()
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
        let playerBlock = document.querySelector(".player-deck")
        let players = playerBlock.querySelectorAll(".player-block")

        players.forEach((currentPlayer) => {
            let selectedBird
            let current
            let playerBirds = currentPlayer.querySelectorAll("[name]")


            playerBirds.forEach((currentPlayerCard) => {
                currentPlayerCard.addEventListener("click", (event) => {
                    selectedBird = event.target

                    let selectedCard = document.querySelector(".selected")
                    if (selectedCard) {
                        selectedCard.classList.remove("selected")
                    }
                    selectedBird.classList.add("selected")
                    let nameAtt = selectedBird.getAttribute("name")

                    let posibles = document.querySelectorAll(`.board-content .${nameAtt}`)

                    let resetPosibles = document.querySelectorAll(".posibles")

                    //Si existe una fila seleccionada, se resetea la clase posibles
                    if (posibles) {
                        resetPosibles.forEach((currentPlayerCard) => {
                            currentPlayerCard.classList.remove("posibles")
                        })

                        //Si no existe una fila seleccionada:
                        posibles.forEach((currentPlayerCard) => {
                            let posiblesParents = currentPlayerCard.closest(".gameRow")
                            let clickableSons = posiblesParents.querySelectorAll(".clickable")

                            clickableSons.forEach((clickableSonRow) => {
                                clickableSonRow.classList.add("posibles")

                                //Para cada clickable de la fila se añade un event click
                                clickableSonRow.addEventListener(
                                    "click",
                                    (event) => {
                                        current = event.target
                                        console.log(current)

                                        let selectedBirdsRow = current.closest(".gameRow").querySelectorAll("[name]")

                                        selectedBirdsRow.forEach((birdInRow) => {
                                            //se limpia la fila seleccionada
                                            birdInRow.remove()

                                            //se añade tres nuevas cartas del deck y se actualiza el deck
                                            let gameRow = current.closest(".gameRow")
                                            gameRow.appendChild(this.addBirdCard(this.cards))
                                            this.remainDeck()
                                        })

                                        //se añade un empty a la fila
                                        current.closest(".gameRow").appendChild(this.addEmptyCard())

                                        //se elimina el primer clickable de la fila, se setean los posibles y el selected del jugador
                                        current.closest(".clickable").remove()
                                        let cleanPosibles = document.querySelectorAll(".posibles")
                                        cleanPosibles.forEach((clickableSonRow) => {
                                            clickableSonRow.classList.remove("posibles")
                                        })

                                        let selectedCard = document.querySelector(".selected")
                                        selectedCard.classList.remove("selected")

                                        //Se recogen los pájaros del jugador
                                        let playerBirdsArr = []
                                        playerBirds.forEach((el) => {
                                            playerBirdsArr.push(el.getAttribute("name"))
                                        })

                                        //Se recogen los pájaros de la fila seleccionada
                                        let selectedBirdsRowArr = []
                                        selectedBirdsRow.forEach((el) => {
                                            selectedBirdsRowArr.push(el.getAttribute("name"))
                                        })

                                        let newBirdToPlayer = []

                                        selectedBirdsRowArr.forEach((rowBirdName) => {
                                            if (playerBirdsArr.includes(rowBirdName)) {
                                                //se actualizan las cartas iguales del jugador
                                                let currentBirdSpan = parseInt(currentPlayer.querySelector(`.${rowBirdName} span`).innerText)

                                                currentPlayer.querySelector(`.${rowBirdName} span`).innerText = currentBirdSpan + 1

                                                currentPlayer.querySelector(`.${rowBirdName} span`).classList.add("badge")

                                            } else {
                                                //Si no existe se añade nuevo pájaro al jugador
                                                selectedBirdsRowArr.forEach((el) => {
                                                    if (!playerBirdsArr.includes(el)) {
                                                        newBirdToPlayer.push(el)
                                                    }
                                                })
                                            }
                                        })

                                        let newPlayerBirds = [...new Set(newBirdToPlayer)]

                                        newPlayerBirds.forEach((el) => {
                                            let birdCard = document.createElement("div")
                                            birdCard.classList.add("col-2", el)
                                            birdCard.classList.remove("selected")
                                            birdCard.setAttribute("name", el)
                                            birdCard.addEventListener("click",this)
                                            this.birdMinMax(birdCard, el)

                                            let badge = document.createElement("span")
                                            badge.innerText = 1

                                            birdCard.appendChild(badge)

                                            currentPlayer.querySelector(".cards").appendChild(birdCard)
                                        })

                                        currentPlayer.querySelectorAll(".clickable").forEach((el) => el.remove())

                                        for (let i = 0; i < 8 - currentPlayer.querySelectorAll(".cards [name]").length; i++) {
                                            currentPlayer.querySelector(".cards").appendChild(this.addEmptyCard())
                                        }

                                        document.querySelectorAll("button").forEach((el) => {
                                            el.disabled = false
                                            el.classList.add("enabled")
                                            el.classList.remove("disabled")
                                        })

                                        // playerBirds.forEach((el) => {
                                        //   el.classList.add("disabled")
                                        // })

                                        //ELIMINAR el event listener
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
            playerBirds = currentPlayer.querySelectorAll("[name]")
            console.log(playerBirds)
        })
    }

    addBirdsToCollection() {
        let playerBlock = document.querySelector(".player-deck")
        let players = playerBlock.querySelectorAll(".player-block")

        players.forEach((currentPlayer) => {
            let selectedBtn

            let addToCollectionBtn = currentPlayer.querySelector(".update-collection-btn")

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
                    const span = parseInt(el.querySelector("span").innerText)

                    if (span >= max) {
                        push = true
                        playerBirdArr.push(name)
                        playerBirdArr.push(name)
                        for (let i = 0; i < span - 1; i++) {
                            this.cards.push({name: name, min: parseInt(min), max: parseInt(max)})
                            shuffleCards(this.cards)
                            this.remainDeck()
                        }
                        currentPlayer.querySelector(`.cards [name = ${name}]`).remove()
                        currentPlayer.querySelector(".cards").appendChild(this.addEmptyCard())
                    } else if (span >= min && span < max) {
                        push = true
                        playerBirdArr.push(name)
                        for (let i = 0; i < span - 1; i++) {
                            this.cards.push({name: name, min: parseInt(min), max: parseInt(max)})
                            shuffleCards(this.cards)
                            this.remainDeck()
                        }
                        currentPlayer.querySelector(`.cards [name = ${name}]`).remove()
                        currentPlayer.querySelector(".cards").appendChild(this.addEmptyCard())
                    }
                })


                if (!push) {
                    const message = document.createElement("div")
                    message.classList.add("col", "justify-content-end", "d-flex", "no-yet")
                    message.innerText = "WAIT! you can't add to collection yet!"
                    currentPlayer.appendChild(message)
                } else {
                    let currentPlayerCollection = document.querySelectorAll(`.carousel-item.${currentId} .cards [name]`)
                    let currentCollection = document.querySelector(`.carousel-item.${currentId} .cards`)
                    currentCollection.innerHTML = ""

                    let currentPlayerCollectionArr = []
                    currentPlayerCollection.forEach((el) => {
                        currentPlayerCollectionArr.push(el.getAttribute("name"))
                    })
                    // console.log(playerBirdArr)
                    // console.log(currentPlayerCollectionArr)

                    let uniqueArr = playerBirdArr.concat(currentPlayerCollectionArr)
                    const birdObj = this.getRepeat(uniqueArr)
                    // console.log(birdObj)

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
                        currentCollection.appendChild(birdCard)
                    })

                    const objLength = Object.keys(birdObj).length
                    if (!(objLength === 8)) {
                        for (let i = 0; i < 8 - objLength; i++) {
                            currentCollection.appendChild(this.addEmptyCard())
                        }
                    }
                }

            })
        })

    }

    finishRound() {
        const nextRoundBtn = document.querySelector(".end-round-btn")
        nextRoundBtn.addEventListener("click", () => {
            console.log("NEXT ROUND!")
            document.querySelectorAll("button").forEach((el) => {
                el.disabled = true
                el.classList.add("disabled")
                el.classList.remove("enabled")
            })
            console.log(document.querySelectorAll("button"))

            if (!this.playerOne) {
                this.playerOne = true
                document.querySelector(".carousel-item.player1").classList.remove("active")
                document.querySelector(".carousel-item.player2").classList.add("active")
                document.querySelector(".player-block.player1").classList.add("hide")
                document.querySelector(".player-block.player2").classList.remove("hide")
            } else {
                this.playerOne = false
                document.querySelector(".carousel-item.player1").classList.add("active")
                document.querySelector(".carousel-item.player2").classList.remove("active")
                document.querySelector(".player-block.player1").classList.remove("hide")
                document.querySelector(".player-block.player2").classList.add("hide")
            }
        }, false)
    }

    andTheWinnerIs() {
        document.querySelectorAll("carousel-item .cards [name]").forEach(el => {

        })
    }
}
