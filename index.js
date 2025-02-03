const app = require("express")();
const axios = require("axios");

const validation = (req, res, next) => {
  const num = req.query?.number;
  console.log(num);

  if (!num || isNaN(num) || !Number.isInteger(Number(num))) {
    return res.status(400).json({
      number: `${num}`,
      error: true,
    });
  }

  next();
};
app.get("/api/classify-number", validation, async (req, res) => {
  const num = Number(req.query.number);
  const fun_fact = await getFunFact(num);

  const abs = Math.abs(num);

  const digitArray = abs.toString().split("").map(Number);
  const digit_sum = digitArray.reduce((acc, currentValue) => {
    return acc + currentValue;
  }, 0);
  const properties = [];
  if (isArmstrong(num, digitArray)) properties.push("armstrong");

  properties.push(isEvenOrOdd(abs));

  return res.status(200).json({
    number: num,
    is_prime: isPrime(num) ? "true" : "false",
    is_perfect: isPerfect(num) ? "true" : "false",
    properties,
    digit_sum,
    fun_fact,
  });
});

function isEvenOrOdd(num) {
  return num % 2 === 0 ? "even" : "odd";
}

function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function isPerfect(n) {
  if (n <= 1) return false;
  let sum = 1;

  for (let i = 2; i * i <= n; i++) {
    if (n % i == 0) {
      sum += i;
      if (i !== n / i) {
        sum += n / i;
      }
    }
  }

  return sum === n;
}

function isArmstrong(num, digitArray) {
  if (num < 0) return false;
  let numOfDigits = digitArray.length;

  let sum = 0;
  for (let i = 0; i < numOfDigits; i++) {
    sum += digitArray[i] ** numOfDigits;
  }
  return sum === num;
}

async function getFunFact(n) {
  try {
    const response = await axios.get(`http://numbersapi.com/${n}/math`);
    return response.data;
  } catch (err) {
    return "no fun fact available";
  }
}

app.listen(8080, () => console.log("Server is listening on port 8080"));
