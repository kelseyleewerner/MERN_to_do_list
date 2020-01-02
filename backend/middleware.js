const validateContentType = (req, res, next) => {
    req.is('application/json') ? next() : res.status(400).send('Content-Type of HTTP requests must be application/json');
}

exports.validateContentType = validateContentType;