const getNames = document.querySelector(".get-names")

if (getNames) {
  document.querySelector(".get-names").onclick = () => {
    let losJugadores = []

    for (let i = 0; i < 2; i++) {
      losJugadores.push(document.querySelector(`.player${i}`).value)
    }
    localStorage.setItem("players", JSON.stringify(losJugadores))
    console.log(losJugadores)
  }
}
