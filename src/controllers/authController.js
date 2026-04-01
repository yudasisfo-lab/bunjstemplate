// src/controllers/authController.js
import { users } from '../models/userModel'
import { setCookie } from 'hono/cookie'

export const showLogin = async (c) => {
    const html = await Bun.file('./src/views/login.html').text()
    return c.html(html)
}

export const login = async (c) => {
    const body = await c.req.parseBody()
    const { username, password } = body

    const user = users.find(u => u.username === username && u.password === password)

    if (!user) return c.text('Login gagal')

    setCookie(c, 'user', JSON.stringify(user), {
        path: '/',
        httpOnly: true
    })
    return c.redirect('/dashboard')
}

export const logout = (c) => {
    setCookie(c, 'user', '', { maxAge: 0, path: '/' })
    return c.redirect('/')
}