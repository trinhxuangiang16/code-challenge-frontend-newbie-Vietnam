import "./Button.css";
export default function Button({ size, handlerConvert, children }) {
  return (
    <button
      onClick={() => {
        handlerConvert();
      }}
      className={`button-form button-${size}`}
      type="button"
    >
      {children}
    </button>
  );
}
