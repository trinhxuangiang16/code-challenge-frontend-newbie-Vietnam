import { useDispatch } from "react-redux";
import "./App.css";
import Header from "./component/header/Header";
import { getConvert } from "./component/redux/currencyConvertActionThunk";
import { useEffect } from "react";
import FormConvert from "./component/form/FormConvert";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConvert());
  }, []);
  return (
    <div>
      <Header />
      <FormConvert />
    </div>
  );
}

export default App;
