class CustomError extends Error {
  constructor(messasge, code) {
    super(messasge);
    this.code = code;
  }
}

export default CustomError;
