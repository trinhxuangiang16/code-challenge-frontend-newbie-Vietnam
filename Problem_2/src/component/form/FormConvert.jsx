import Button from "../button/Button";
import SelectCurrency from "./SelectCurrency";
import { icon } from "../../assets/svg";
import "./style.css";
import Input from "./Input";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAmountAction,
  getToCurrencyAction,
  getCurrentResultAction,
  reverseTheWayToChange,
  setIsLoadingAction,
  hasErrorAction,
} from "../redux/currencySlice";
import {
  handleValidateChooseType,
  handleValidateInput,
} from "../../util/validation";

export default function FormConvert() {
  //State use for render exchange rates
  const [isA, setIsA] = useState(false);
  const [isB, setIsB] = useState(false);

  //State manage type od currency in input (A) / output (B)
  const dataMoneyA =
    useSelector((state) => state.currencyStore.amountState) || {};
  const dataMoneyB =
    useSelector((state) => state.currencyStore.toCurrency) || {};

  //The result after convert
  const result = useSelector((state) => state.currencyStore.result) || 0;

  // Error
  const err = useSelector((state) => state.currencyStore.error);

  //State isLoading.button in redux store
  const isLoading =
    useSelector((state) => state.currencyStore.isLoading.button) || false;

  //ref of input
  let amountRef = useRef();

  //ref of output
  const toCurrencyRef = useRef();

  const dispatch = useDispatch();

  //get type of currency in input affer choose option in SelectCurrency component
  const handleAmountChange = (e) => {
    const value = e.target.value;
    dispatch(getAmountAction(value));
    setIsA(true);
  };

  //get type of currency in output affer choose option in SelectCurrency component
  const handleToCurrencyChange = (e) => {
    const value = e.target.value;
    dispatch(getToCurrencyAction(value));
    setIsB(true);
  };

  //Convert currency
  let handlerConvertCurrency = async () => {
    if (!handleValidateInput(amountRef.current.value)) {
      dispatch(
        hasErrorAction("Please enter a positive integer greater than 0!")
      );
      return;
    }

    if (
      !handleValidateChooseType(dataMoneyA.exchange_rate_usd) ||
      !handleValidateChooseType(dataMoneyB.exchange_rate_usd)
    ) {
      dispatch(
        hasErrorAction("Please choose a currency type for both fields!")
      );
      return;
    }
    dispatch(hasErrorAction(null));
    let moneyB = 0;
    let moneyA = Number(amountRef.current.value) || 0;
    if (dataMoneyA?.exchange_rate_usd && dataMoneyB?.exchange_rate_usd) {
      moneyB =
        moneyA *
        (Number(dataMoneyB.exchange_rate_usd) /
          Number(dataMoneyA.exchange_rate_usd));
    }

    //Create loading effect
    dispatch(setIsLoadingAction(true));
    await new Promise((resolve) => setTimeout(resolve, 2000));
    dispatch(setIsLoadingAction(false));

    //Round to 6th decimal place for some very small denominations
    dispatch(getCurrentResultAction(Number(moneyB.toFixed(6))));
  };

  //Invert the position of the currency in the input and output
  let handleExchangeConvert = () => {
    dispatch(reverseTheWayToChange());
  };

  return (
    <div className="form-convert">
      <div className="container">
        <form className="form-wrap">
          <div className="form-title">
            <h2>Real-time exchange rates at your fingertips.</h2>
            {isA && isB && (
              <p>
                Currency exchange rate: 1 {`${dataMoneyA.currency_code}`} =
                {"  "}
                {(
                  Number(dataMoneyB.exchange_rate_usd) /
                  Number(dataMoneyA.exchange_rate_usd)
                ).toFixed(6)}
                {`  ${dataMoneyB.currency_code}`}
              </p>
            )}
          </div>
          <div className="form-content">
            <div>
              <Input Ref={amountRef} typeInput="input-amount" label="Amount">
                <SelectCurrency
                  selected={dataMoneyA?.currency_code || ""}
                  handleSelect={handleAmountChange}
                  iso={dataMoneyA.iso}
                />
              </Input>
              {err != null ? (
                <p className="error">{err}</p>
              ) : (
                <p className="error"></p>
              )}
            </div>

            <Button size="Sm" handlerConvert={handleExchangeConvert}>
              {icon.arrow}
            </Button>
            <Input
              Ref={toCurrencyRef}
              typeInput="output-amount"
              label="To currency"
              result={result}
            >
              <SelectCurrency
                selected={dataMoneyB?.currency_code || ""}
                handleSelect={handleToCurrencyChange}
                iso={dataMoneyB.iso}
              />
            </Input>
            <br />
            <Button
              handlerConvert={handlerConvertCurrency}
              isLoading={isLoading}
              size="Lg"
            >
              CONFIRM SWAP
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
