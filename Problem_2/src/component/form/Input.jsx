export default function Input({
  typeInput,
  label,
  children,
  Ref,
  result,
  iso,
}) {
  return (
    <div className="input-currency">
      <label htmlFor="input-amount">{label}</label>
      <div className="inline-input">
        {result ? (
          <input
            type="number"
            id={typeInput}
            value={result == 0 ? "" : result}
            readOnly
          />
        ) : (
          <input type="number" ref={Ref} id={typeInput} />
        )}
        {children}
        <span id="flag-display" className={`fi fi-${iso}`} />
      </div>
    </div>
  );
}
