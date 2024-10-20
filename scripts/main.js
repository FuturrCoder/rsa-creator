'use strict'

var bigInt = requirejs(['./big-integer/BigInteger'])
const letterKey = {a:"11", b:"12", c:"13", d:"14", e:"15", f:"16", g:"17", h:"18", i:"19", j:"20", k:"21", l:"22", m:"23", n:"24", o:"25", p:"26", q:"27", r:"28", s:"29", t:"30", u:"31", v:"32", w:"33", x:"34", y:"35", z:"36"}
const numberKey = {11:"a", 12:"b", 13:"c", 14:"d", 15:"e", 16:"f", 17:"g", 18:"h", 19:"i", 20:"j", 21:"k", 22:"l", 23:"m", 24:"n", 25:"o", 26:"p", 27:"q", 28:"r", 29:"s", 30:"t", 31:"u", 32:"v", 33:"w", 34:"x", 35:"y", 36:"z"}
var random = true

function setRandom() {
  random = true
  $('#choiceLeft').css('background-color', '#aaa')
  $('#choiceRight').css('background-color', '#fff')
  $('#rOptions').css('display', 'block')
  $('#mOptions').css('display', 'none')
}

function setManual() {
  random = false
  $('#choiceLeft').css('background-color', '#fff')
  $('#choiceRight').css('background-color', '#aaa')
  $('#rOptions').css('display', 'none')
  $('#mOptions').css('display', 'block')
}

function generateKeys() {
  $('#n').html('')
  $('#e').html('')
  $('#d').html('')

  var p = bigInt.randBetween(String($('#pMin').val()), String($('#pMax').val()))
  while (true) {
    if (bigInt(p).isPrime() == false) {
      p = bigInt(p).minus(1)
    } else if (bigInt(p).isPrime) {
      break
    }
  }

  var q = bigInt.randBetween(String($('#pMin').val()), String($('#pMax').val()))
  while (true) {
    if (!bigInt(q).isPrime()) {
      q = bigInt(q).minus(1)
    } else if (bigInt(q).isPrime) {
      break
    }
  }

  var n = bigInt(p).times(bigInt(q))
  var phi = bigInt(p).minus(1).times(bigInt(q).minus(1))

  var e = bigInt.randBetween("65537", bigInt(phi))
  while (true) {
    if (bigInt.gcd(bigInt(e), bigInt(phi)) != 1) {
      e = bigInt(e).minus(1)
    } else if (bigInt.gcd(bigInt(e), bigInt(phi)) == 1) {
      break
    }
  }

  var d = bigInt(e).modInv(bigInt(phi))

  $('#n').append(`<br><span>Modulus (n): ${bigInt(n).toString()}</span>`)
  $('#e').append(`<span>Encryption exponent (e): ${bigInt(e).toString()}</span>`)
  $('#d').append(`<span>Decryption exponent (d): ${bigInt(d).toString()}</span>`)
}

function encrypt() {
  $('#encrypted').html('')

  var message = $('#enInput').val()
  var numMes = ""
  for (var i = 0; i < message.length; i++) {
    numMes = numMes + String(letterKey[String(message.charAt(i)).toLowerCase()])
  }

  var e = bigInt(String($('#eInput1').val()))
  var n = bigInt(String($('#nInput1').val()))

  var encrypted = bigInt(numMes).modPow(bigInt(e), bigInt(n))

  $('#encrypted').append(`Encrypted message: ${bigInt(encrypted).toString()}`)
}

function decrypt() {
  $('#decrypted').html('')

  var encrypted = $('#deInput').val()

  var d = bigInt(String($('#dInput2').val()))
  var n = bigInt(String($('#nInput2').val()))

  var decrypted = bigInt(String(encrypted)).modPow(bigInt(d), bigInt(n)).toString()
  var strDe = ""
  for (var i = 0; i < decrypted.length; i += 2) {
    strDe = strDe + numberKey[String(parseInt(decrypted.charAt(i))*10+parseInt(decrypted.charAt(i+1)))]
  }

  $('#decrypted').append(`Decrypted message: ${strDe}`)
}
