const getNames = document.querySelector(".get-names")

if (getNames) {
  document.querySelector(".get-names").onclick = () => {
    let playerNames = []
    localStorage.setItem("player1", document.querySelector(".player1").value)
    localStorage.setItem("player2", document.querySelector(".player2").value)
    playerNames.push(localStorage.getItem("player1"))
    playerNames.push(localStorage.getItem("player2"))
    console.log(playerNames)
  }
}
