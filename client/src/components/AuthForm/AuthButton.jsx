function AuthButton({ text }) {
  return (
    <button
      type="submit"
      className="btn btn-success w-100"
    >
      {text}
    </button>
  );
}

export default AuthButton;