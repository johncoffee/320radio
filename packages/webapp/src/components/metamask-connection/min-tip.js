
const ethEur = 380
const gasPrice = 110 * 10**9
const txGas = 63000
const txPriceEth = txGas * gasPrice / 10**18
const txPriceEUR = txPriceEth * ethEur

// maxPct 0.1 = 10%
function isEnough(input, maxPct = 0.1) {
  // console.log(txPriceEUR, input * maxPct, input * maxPct > txPriceEUR)
  return input * maxPct > txPriceEUR
}

function calcMinAmount() {
  let amount = 1
  while (!isEnough(amount)) {
      amount += 0.25
  }
  return amount
}

console.log(
  calcMinAmount()
)

