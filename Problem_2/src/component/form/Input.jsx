export default function Input({ typeInput, label, children, Ref }) {
  return (
    <div className="input-currency">
      <label htmlFor="input-amount">{label}</label>
      <div className="inline-input">
        <input ref={Ref} id={typeInput} />
        {children}
        <span id="flag-display" className="fi fi-us" />
      </div>
    </div>
  );
}
