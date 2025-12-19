"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinController = exports.signupController = void 0;
const authService_1 = require("../services/authService");
const signupController = async (req, res) => {
    const { email, password } = req.body;
    console.log(' req.body: ', req.body);
    const existing = await (0, authService_1.findUserByEmail)(email);
    if (existing) {
        return res.status(400).json({ message: "User already exists" });
    }
    await (0, authService_1.createUser)({
        userId: Date.now().toString(),
        email,
        password,
        role: "user",
    });
    res.status(201).json({ message: "Signup success" });
};
exports.signupController = signupController;
const signinController = async (req, res) => {
    const { email, password } = req.body;
    const user = await (0, authService_1.findUserByEmail)(email);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Signin success", userId: user.userId });
};
exports.signinController = signinController;
