const board = new Board(cards)

window.addEventListener("load", (event) => {
  board.initPlayersDeck()
  board.initPlayersBands()
  board.addCardsRow()
  board.initCollectBirds()
  board.addBirdsToCollection()
})
