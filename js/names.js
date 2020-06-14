const plus = document.querySelector(".plus")
const minus = document.querySelector(".minus")

minus.style.opacity = 0.3
minus.disabled = true

plus.addEventListener(
  "click",
  () => {
    const form = document.getElementById("players-names")
    const label = document.createElement("label")
    const input = document.createElement("input")
    let number = parseInt(document.querySelector(".players-qty").innerText)
    number++

    minus.style.opacity = 1
    minus.disabled = false

    if (number === 5) {
      plus.style.opacity = 0.3
      plus.disabled = true
    }

    document.querySelector(".players-qty").innerText = number

    label.innerText = `player ${number}:`
    label.classList.add("appear")
    input.classList.add("player-input", `player${number}`)
    input.setAttribute("type", "text")
    input.setAttribute("name", `player${number}`)

    form.appendChild(label)
    label.appendChild(input)
  },
  false
)

minus.addEventListener(
  "click",
  () => {
    const form = document.getElementById("players-names")
    let number = parseInt(document.querySelector(".players-qty").innerText)
    number--

    if (number === 2) {
      minus.disabled = true
      minus.style.opacity = 0.3
    } else if (number < 5) {
      plus.disabled = false
      plus.style.opacity = 1
    }

    document.querySelector(".players-qty").innerText = number
    form.lastChild.classList.remove("appear")
    form.lastChild.classList.add("disappear")
    setTimeout(() => {
      form.removeChild(form.lastChild)
    }, 100)
  },
  false
)

document.querySelector(".get-names").onclick = () => {
  let number = parseInt(document.querySelector(".players-qty").innerText)
  console.log(number)
  let players = []
  for (let i = 1; i <= number; i++) {
    if (document.querySelector(`.player${i}`).value === "") {
      players.push(`player ${i}`)
    } else {
      players.push(document.querySelector(`.player${i}`).value)
    }
  }
  localStorage.setItem("playersNames", JSON.stringify(players))
}
