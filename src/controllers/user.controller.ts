import { Request, Response } from "express";
import User from "../models/user.model.js";


const findOrCreateUser = async (ip: string) => {
    try{
        let user = await User.findOne({ ip });
        if (!user) {
            user = await User.create({ ip }); // default credit = 200
        }
        return user;
    } catch (error) {
        console.log(error);
    }

};

// ✅ Get credit balance
export const getCreditBalance = async (req: Request, res: Response) => {
    try {
        const ip = req.ip as string;
        console.log(ip)
        const user = await findOrCreateUser(ip);

        if(!user) {
            return res.status(404).json({success: false, message: "User not found and cannot be created"});
        }

        return res.json({
            success: true,
            credit: user.credit,
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};

// ✅ Unlock profile (cost = 10 credits)
export const unlockProfile = async (req: Request, res: Response) => {
    try {
        const ip:string = req.ip as string;
        console.log( "IP" + ip);
        const { profileId } = req.body;
        if (!profileId) {
            return res.status(400).json({ success: false, message: "profileId is required" });
        }

        const user = await findOrCreateUser(ip);

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found and cannot be created" });
        }

        // Check if already unlocked
        if (user.unlockedProfiles.includes(profileId)) {
            return res.json({ success: true, message: "Profile already unlocked" });
        }

        // Check credit
        if (user.credit < 10) {
            return res.status(400).json({
                success: false,
                message: "Not enough credits",
            });
        }

        // Deduct credits and unlock
        user.credit -= 10;
        user.unlockedProfiles.push(profileId);
        await user.save();

        return res.json({
            success: true,
            message: "Profile unlocked successfully",
            creditRemaining: user.credit,
        });
    } catch (err) {
        return res.status(500).json({ success: false, error: err });
    }
};
