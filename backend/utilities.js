const jwt = require('jsonwebtoken');

function authentificateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log("Authorization Header:", authHeader); // Log the header
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        console.log("No token provided");
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            console.error("JWT verification failed:", err);
            return res.sendStatus(403); // Forbidden
        }

        console.log("Decoded user:", user); // Log the decoded user
        
        // Check if the user object is valid before assigning it to req.user
        if (user && user.userId) {
            req.user = { userId: user.userId }; // Attach userId to req.user
        } else {
            console.error("Invalid user data from token");
            return res.sendStatus(403); // Forbidden if user data is invalid
        }

        next(); // Proceed to the next middleware/route handler
    });
}

module.exports = {
    authentificateToken,
};
