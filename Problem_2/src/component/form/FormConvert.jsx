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
} from "../redux/currencySlice";

export default function FormConvert() {
  const [isA, setIsA] = useState(false);
  const [isB, setIsB] = useState(false);

  const dataMoneyA = useSelector((state) => state.currencyStore.amountState);
  const dataMoneyB = useSelector((state) => state.currencyStore.toCurrency);
  const result = useSelector((state) => state.currencyStore.result) || 0;

  const amountRef = useRef();
  const toCurrencyRef = useRef();

  const dispatch = useDispatch();

  const handleAmountChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(getAmountAction(value));
    setIsA(true);
  };

  const handleToCurrencyChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(getToCurrencyAction(value));
    setIsB(true);
  };

  let handlerConvertCurrency = () => {
    let moneyB = 0;
    let moneyA = Number(amountRef.current.value) || 0;
    if (dataMoneyA?.exchange_rate_usd && dataMoneyB?.exchange_rate_usd) {
      moneyB =
        moneyA *
        (Number(dataMoneyB.exchange_rate_usd) /
          Number(dataMoneyA.exchange_rate_usd));
    }
    dispatch(getCurrentResultAction(Number(moneyB.toFixed(2))));
  };

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
                ).toFixed(2)}
                {`  ${dataMoneyB.currency_code}`}
              </p>
            )}
          </div>
          <div className="form-content">
            <Input
              iso={dataMoneyA.iso}
              Ref={amountRef}
              typeInput="input-amount"
              label="Amount"
            >
              <SelectCurrency
                selected={dataMoneyA?.currency_code || ""}
                handleSelect={handleAmountChange}
              />
            </Input>
            <Button size="Sm" handlerConvert={handleExchangeConvert}>
              {icon.arrow}
            </Button>
            <Input
              iso={dataMoneyB.iso}
              Ref={toCurrencyRef}
              typeInput="output-amount"
              label="To currency"
              result={result}
            >
              <SelectCurrency
                selected={dataMoneyB?.currency_code || ""}
                handleSelect={handleToCurrencyChange}
              />
            </Input>
            <br />
            <Button handlerConvert={handlerConvertCurrency} size="Lg">
              CONFIRM SWAP
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
