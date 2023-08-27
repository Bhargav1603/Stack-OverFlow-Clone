import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';

export const signin = async (req, res) => {
     const { email, password } = req.body;
     try {
          const existingUser = await User.findOne({ email });
          if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
          const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
          if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials!" });
          const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1hr" });
          res.status(200).json({ result: existingUser, token })
     } catch (error) {
          res.status(500).json({ message: "Something went wrong!" });
     }
}

export const signup = async (req, res) => {
     const user = req.body;
     try {
          const existingUser = await User.findOne({ email: user.email });
          if (existingUser) return res.status(404).json({ message: "User already exists" });
          if (user.password !== user.confirmPassword) return res.status(400).json({ message: "Passwords Dont Match" });
          const hashedPassword = await bcrypt.hash(user.password, 12);
          const result = new User({ email: user.email, password: hashedPassword, name: `${user.firstName} ${user.lastName}` });
          await result.save();
          const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1hr" });
          res.status(200).json({ result, token })
     } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Something went wrong!" });
     }
}