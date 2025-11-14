/*Three way to sum to n
- Input: n - any integer
- n may be a negative number/ positive numver / 0
- Output: return - summation to n
- Below are 3 ways to calculate the sum up to n:
*/

//Calculate sum using a for loop
var sum_to_n_a = function (n) {
  let sumA = 0;

  if (n > 0) {
    for (let i = 1; i <= n; i++) {
      sumA = sumA + i;
    }
  } else if (n < 0) {
    // sum from n up to -1 if n < 0
    for (let i = n; i < 0; i++) {
      sumA = sumA + i;
    }
  } else {
    sumA = 0;
  }
  return sumA;
};

//Calculate sum using the sum formula of numbers up to n: (n*(n+1))/2
var sum_to_n_b = function (n) {
  let sumB = 0;

  if (n > 0) {
    sumB = (n * (n + 1)) / 2;
  } else if (n < 0) {
    //convert to positive number
    let newN = Math.abs(n);
    sumB = (newN * (newN + 1)) / 2;

    //convert to negative numbers
    sumB = -sumB;
  } else {
    sumB = 0;
  }

  return sumB;
};

//Calculate sum using recursion
var sum_to_n_c = function (n) {
  if (n === 0) {
    return n;
  }

  if (n > 0) {
    return n === 1 ? 1 : n + sum_to_n_c(n - 1);
  }

  if (n < 0) {
    return n === -1 ? -1 : n + sum_to_n_c(n + 1);
  }
};

console.log("sum_to_n_a with n > 0 ", sum_to_n_a(15));
console.log("sum_to_n_a with n < 0 ", sum_to_n_a(-1));
console.log("sum_to_n_a with n = 0 ", sum_to_n_a(0));

console.log("sum_to_n_b with n > 0 ", sum_to_n_b(15));
console.log("sum_to_n_b with n < 0 ", sum_to_n_b(-1));
console.log("sum_to_n_b with n = 0 ", sum_to_n_b(0));

console.log("sum_to_n_c with n > 0 ", sum_to_n_c(15));
console.log("sum_to_n_c with n < 0 ", sum_to_n_c(-1));
console.log("sum_to_n_c with n = 0 ", sum_to_n_c(0));
