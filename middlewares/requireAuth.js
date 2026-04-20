import Session from "../models/session.model.js";
import User from "../models/user.model.js";

export const requireAuth = async (req,res,next) => {
    try {
    const sessionId = req.cookies.sid;
    const session = await Session.findById(sessionId);
    if (!session) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Authentication required. Please log in to continue.",
        });
    }
    const user = await User.findById(session.userId);
    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Authentication required. Please log in to continue.",
        });
    }
    req.user = user;
    next()
        
    } catch (error) {
        console.log(error);
        next(error)


        
    }
}