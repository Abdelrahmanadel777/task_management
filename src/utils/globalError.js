export const globalError = (err, req, res, next) => {
    let statusCode = err.statusCode || 500
    res.json({ error: err.message, statusCode });

}