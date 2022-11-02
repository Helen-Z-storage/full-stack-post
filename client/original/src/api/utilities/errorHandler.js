class ErrorHandler {
  static codeError(res, code, message) {
    return res.status(code).json({ error: message });
  }
}

module.exports = ErrorHandler;
