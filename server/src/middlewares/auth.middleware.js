import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.models.js';

export const isAuthenticated = asyncHandler(async (req, res, next) => {
    try {
        console.log("🛡️ Checking token...");

        // Extract Token from Cookies or Authorization Header
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.split(" ")[1]?.trim();

        console.log("🍪 Token from cookies:", req.cookies?.accessToken);
        console.log("📄 Token from Authorization header:", req.header("Authorization"));

        // Check if Token Exists
        if (!token) {
            console.log("❌ Token not found!");
            return res.status(401).json(
                new ApiResponse(401, "Unauthorized Request: Access token not found")
            );
        }

        // Verify Token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("✅ Decoded Token:", decodedToken);

        // Fetch User
        const user = await User.findById(decodedToken._id).select(
            "-password -refreshToken"
        );

        if (!user) {
            console.log("❌ User not found!");
            return res.status(404).json(
                new ApiResponse(404, "User not found")
            );
        }

        // Attach User Object to Request
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            console.log("❌ Token Expired!");
            return res.status(401).json(
                new ApiResponse(
                    401,
                    "Unauthorized Request: Access token has expired"
                )
            );
        }

        console.error("💥 Error in isAuthenticated Middleware:", error.message);
        return res.status(500).json(
            new ApiResponse(500, "Internal Server Error", error.message)
        );
    }
});
