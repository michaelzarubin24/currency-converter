enum Currency {
  EURO = "euro",
  DOLLAR = "dollar",
  UAH = "uah",
}

interface ConversionRates {
  [Currency.EURO]: { [Currency.DOLLAR]: number; [Currency.UAH]: number };
  [Currency.DOLLAR]: { [Currency.EURO]: number; [Currency.UAH]: number };
  [Currency.UAH]: { [Currency.EURO]: number; [Currency.DOLLAR]: number };
}

interface Exchange {
  fromCurrency: Currency;
  toCurrency: Currency;
}

//--------------------Get-user-input--------------
const amountInput = document.getElementById("amount") as HTMLInputElement;
const fromCurrencySelect = document.getElementById(
  "fromCurrency"
) as HTMLSelectElement;
const toCurrencySelect = document.getElementById(
  "toCurrency"
) as HTMLSelectElement;
const resultDisplay = document.getElementById("result") as HTMLParagraphElement;
const removedOptions: HTMLOptionElement[] = [];

// ---------button----------
const button = document.querySelector("button") as HTMLButtonElement;
button.addEventListener("click", () => {
  convertCurrency();
});

fromCurrencySelect.addEventListener("change", () => {
  removedOptions.forEach((options) => {
    toCurrencySelect.add(options);
  });
  const selectedCurrency = fromCurrencySelect.value;
  for (let option of toCurrencySelect.options) {
    if (option.value === selectedCurrency) {
      removedOptions.push(option);
      option.remove();
    }
  }
});

// --------main-func-------
function convertCurrency() {
  // Validate input
  const amount = parseInt(amountInput.value);
  if (isNaN(amount)) {
    alert("Please enter a valid number.");
    return;
  }

  // Get selected currencies
  const exchange: Exchange = {
    fromCurrency: fromCurrencySelect.value as Currency,
    toCurrency: toCurrencySelect.value as Currency,
  };

  // Conversion rates
  const conversionRates: ConversionRates = {
    [Currency.EURO]: { [Currency.DOLLAR]: 1.09, [Currency.UAH]: 39.37 },
    [Currency.DOLLAR]: { [Currency.EURO]: 0.92, [Currency.UAH]: 36.07 },
    [Currency.UAH]: { [Currency.EURO]: 0.025, [Currency.DOLLAR]: 0.028 },
  };

  // Perform conversion
  const fromCurrencyRates = conversionRates[exchange.fromCurrency] as {
    [toCurrency in Currency]: number;
  };
  const conversionRate = fromCurrencyRates[exchange.toCurrency];
  const result = amount * conversionRate;

  resultDisplay.textContent = `${amount} ${
    exchange.fromCurrency
  } is ${result.toFixed(2)} ${exchange.toCurrency}`;
}
