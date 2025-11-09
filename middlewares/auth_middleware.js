import jwt from "jsonwebtoken"

export async function verifyToken(req, res, next) {
  // extracting the token from cookie | authorization-header

  const fromCookie = req.cookies?.token
  const fromHeader = req.headers.authorization // supports "Bearer <token>"
  const token = fromCookie || fromHeader

  // bearer prefix - the standard way
  // const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ error: "token not found" })

  try {
    // checks the validity of the token
    const verified = jwt.verify(token, process.env.MY_SECRET_KEY)
    req.user = verified
    next()
  } catch (error) {
    return res.status(403).json({ message: "token is invalid or expired" })
  }
}
