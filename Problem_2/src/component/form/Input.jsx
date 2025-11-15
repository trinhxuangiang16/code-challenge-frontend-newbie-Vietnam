export default function Input({ typeInput, label, children, Ref, result }) {
  const isResult = result !== undefined && result !== null;

  return (
    <div className="input-currency">
      <label htmlFor="input-amount">{label}</label>
      <div className="inline-input">
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
