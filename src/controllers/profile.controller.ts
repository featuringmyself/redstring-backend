import { Request, Response } from "express";
import Profile, { IProfile } from "../models/profile.model.js";

// Create a new profile
export const createProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const newProfile: IProfile = await Profile.create(req.body);
        res.status(201).json(newProfile);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

// Get all profiles
export const getAllProfiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const profiles: IProfile[] = await Profile.find();
        res.status(200).json(profiles);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

// Get profile by ID
export const getProfileById = async (req: Request, res: Response): Promise<void> => {
    try {
        const profile: IProfile | null = await Profile.findById(req.params.id);
        if (!profile) {
            res.status(404).json({ message: "Profile not found" });
            return; // Just return, don't return res.status()
        }
        res.status(200).json(profile);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
