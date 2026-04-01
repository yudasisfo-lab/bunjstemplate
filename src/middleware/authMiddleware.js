// src/middleware/authMiddleware.js
export const auth = async (c, next) => {
  const user = c.req.header('cookie')
  if (!user) return c.redirect('/')
  await next()
}