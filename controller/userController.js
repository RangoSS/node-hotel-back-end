import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER USER
export  const registerUser = async (req, res) => {
    const { name, surname, phone, address, role, email, password } = req.body;

    try {
        // Check if user already exists (by email or phone)
        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) {
            return res.status(422).json({ message: "User with this email or phone number already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            surname,
            phone,
            address,
            role: role || "user",
            email,
            password: hashedPassword,
        });

        if (user) {
            // Generate token
            const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "5h" });

            res.status(201).json({
                message: "User registered successfully",
                token,
                user: {
                    _id: user.id,
                    name: user.name,
                    surname: user.surname,
                    phone: user.phone,
                    address: user.address,
                    role: user.role,
                    email: user.email,
                },
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// LOGIN USER
export  const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: "5h" });

            res.json({
                message: "Login successful",
                token,
                user: {
                    _id: user.id,
                    name: user.name,
                    surname: user.surname,
                    phone: user.phone,
                    address: user.address,
                    role: user.role,
                    email: user.email,
                },
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


