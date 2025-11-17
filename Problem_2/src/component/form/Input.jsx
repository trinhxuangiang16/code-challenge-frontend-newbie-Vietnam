export default function Input({ typeInput, label, children, Ref, result }) {
  const isResult = result !== undefined && result !== null;

  //Component create Input for this project
  return (
    <div className="input-currency">
      <label htmlFor="input-amount">{label}</label>
      <div className="inline-input">
        {/* Set a condition so that the user only enters the Amount field */}
        {isResult ? (
          <input id={typeInput} value={result == 0 ? "" : result} readOnly />
        ) : (
          <input ref={Ref} defaultValue={result || ""} id={typeInput} />
        )}
        {children}
      </div>
    </div>
  );
}
