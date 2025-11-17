import "./Button.css";

//Component create Button for this project
export default function Button({ size, handlerConvert, children, isLoading }) {
  return (
    <button
      onClick={() => {
        //the function can be change type off currency or convert currency depends on the transmitted props
        handlerConvert();
      }}
      type="button"
      className={`btn button-form button-${size}`}
      disabled={isLoading}
    >
      {/* Render is loading in this button */}
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
