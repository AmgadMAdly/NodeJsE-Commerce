
function authorizeRoles(allowedRoles = []) {
    return (req, res, next) => {
      const { role } = req.user;  

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({ message: "Unauthorized - Insufficient Role" });
      }
  
      next();
    };
  }
  
  module.exports = authorizeRoles;
  