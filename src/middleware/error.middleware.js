const errorHandler = (error, request, response, next) => {
  if (error.status === 401 && error.message === "Unauthorized") {
    const status = 401;
    // standard HTTP 401 error message
    const message = "Unauthorized";
    // the link to the right page from your documentation
    const documentationLink = "https://auth0.com/blog/forbidden-unauthorized-http-status-codes/#When-to-Use-403-Forbidden-";

    // implementing a custom error response on 401 errors
    // matching the GitHub error response format
    response.status(status).json({
      message: message,
      documentationLink: documentationLink
    });

    return;
  }

  if (
      error.status === 401 &&
      error.code === "invalid_token" &&
      error.message === "Permission denied"
  ) {
    const status = 403;
    // standard HTTP 403 error message
    const message = "Forbidden";
    // the link to the right page from your documentation
    const documentationLink = "https://auth0.com/blog/forbidden-unauthorized-http-status-codes/#When-to-Use-403-Forbidden-";

    // implementing a custom error response on 403 errors
    // matching the GitHub error response format
    response.status(status).json({
      message: message,
      documentationLink: documentationLink
    });

    return;
  }

  const status = error.statusCode || error.code || 500;
  const message = error.message || "internal error";

  response.status(status).json({ message });
};

module.exports = {
  errorHandler,
};