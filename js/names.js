document.querySelector(".get-names").onclick = () => {
  let players = []
  for (let i = 1; i <= 2; i++) {
    players.push(document.querySelector(`.player${i}`).value)
  }
  localStorage.setItem("playersNames", JSON.stringify(players))
  console.log(players)
}
