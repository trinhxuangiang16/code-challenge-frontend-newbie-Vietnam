import { useDispatch } from "react-redux";
import "./App.css";
import FormConvert from "./component/form/FormConvert";
import Header from "./component/header/Header";
import { getConvert } from "./component/redux/currencyConvertActionThunk";

function App() {
  const dispatch = useDispatch();

  const handleFetch = () => {
    dispatch(getConvert());
  };

  return (
    <div>
      <Header />
      <FormConvert />
      <button onClick={handleFetch}>Fetch</button>
    </div>
  );
}

export default App;
