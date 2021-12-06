var jogos = [];
for (var j = 0; j < jogos.length + 1; j++) {
  var arr = [];
  for (var i = 0; i < 6; i++) {
    var numero = Math.floor(Math.random() * 60) + 1;
    if (!arr.includes(numero)) {
      arr.push(numero);
    } else {
      i--;
    }
  }
  arr = arr
    .sort(function (a, b) {
      return a - b;
    })
    .toString();
  if (!jogos.includes(arr)) {
    jogos.push(arr);
    console.log("Tentativa número:", jogos.length + ":", arr);
  } else {
    var resultString = jogos.indexOf(arr) + 1 + ": " + arr;
    var fixString = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!";
    var blankString = "!!!                   ";
    for (var i = 0; i < resultString.length; i++) {
      fixString = fixString + "!";
      blankString = blankString + " ";
    }
    blankString = blankString + "    !!!";
    console.log(
      "\n",
      fixString,
      "\n",
      blankString,
      "\n",
      "!!!    JOGO VENCEDOR: " + resultString + "    !!!",
      "\n",
      blankString,
      "\n",
      fixString,
      "\n"
    );
    j = jogos.length;
  }
}
