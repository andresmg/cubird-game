const board = new Board(cards)

window.addEventListener("load", (event) => {
  board.getPlayersNames()
  board.initPlayersDeck()
  board.initPlayersBands()
  board.addCardsRow()
})
