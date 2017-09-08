// a reusable middleware that checks the current user is logged in
// middleware should be reusable

module.exports = (req, res, next) => {
    if(!req.user) {
        return res.status(401).send({ error: 'You must log in!' });
    }

    next();
};