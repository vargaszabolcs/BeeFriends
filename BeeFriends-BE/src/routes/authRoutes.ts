import { User } from "./../models/User";
import express from "express";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

const JWT_SECRET = "MY_ASS_HURTS";

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (await User.findOne({ email })) {
            return res.status(400).send("User already exists!");
        }

        const user = new User({
            email,
            password
        });

        await user.save();

        const token = jsonwebtoken.sign({ userId: user._id }, JWT_SECRET);
        res.send({ token });
    } catch (err) {
        console.error("Something went wrong with saving to user to database!", err);
        return res.status(422).send(err.message);
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.send({error: "User does not exist!"});
    }

    try {
        await user.comparePasswords(password);
        const token = jsonwebtoken.sign({userId: user._id}, JWT_SECRET);
        res.send({token});
    } catch (err) {
        console.log("Password is not correct!");
        return res.send({error: "Invalid password!"});
    }
});

export default router;
