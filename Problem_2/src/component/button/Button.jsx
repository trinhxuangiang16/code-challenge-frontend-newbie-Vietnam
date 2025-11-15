import "./Button.css";
export default function Button({ size, handlerConvert, children, isLoading }) {
  return (
    <button
      onClick={() => {
        handlerConvert();
      }}
      type="button"
      className={`btn button-form button-${size}`}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          />
          <span className="btn-loading">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
