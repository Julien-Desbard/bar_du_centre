
export default function AppError(statusCode, code = "INTERNAL_ERROR",message, details = {}) {
	const error = new Error(message);

	error.statusCode = statusCode;
	error.code = code;
	error.details = details;
	error.isOperational = true;

	Error.captureStackTrace(error, AppError);

	return error;
}


