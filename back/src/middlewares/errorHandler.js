export default function errorHandler(err, req, res, next) {
    let statusCode = err.statusCode || 500;
    let code = err.code || "INTERNAL_ERROR";
    let message = err.message || "An error occured";

    let details = err.details || {};


    res.status(statusCode).json({
        success: false,
        error: {
            statusCode,
            code,
            message,
            timestamp: new Date().toISOString(),
            path: req.path,
 
            details: details, 
        },
    });
}