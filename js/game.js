const board = new Board(cards)

window.addEventListener("load", (event) => {
  board.shuffleCards()
  board.addCardsRow()
})
