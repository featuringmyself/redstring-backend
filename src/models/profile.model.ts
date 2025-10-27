import mongoose, { Schema, Document } from "mongoose"

// Interface for TypeScript type checking
export interface IProfile extends Document {
    name: string;
    profession: string;
    clubMember: boolean;
    yoe: string;
    company: string;
    location: string;
    availability: string;
    status: "under review" | "cancelled" | "approved";
    about: string;
    skills: string[];
    college: {
        course: string;
        institution: string;
        session: string;
    };
    experience: {
        profession: string;
        company: string;
        session: string;
    };
    score: number;
    website: string;
    resume: string;
    email: string;
    nextOpportunity: {
        profession: string;
        package: string;
    };
    socials: {
        linkedin: string;
        twitter: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

// Should be more strict in production usage
const ProfileSchema = new Schema<IProfile>({
    name: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    clubMember: {
        type: Boolean,
        default: false,
    },
    yoe: {
        type: String,
        default: "0-1",
    },
    company: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
    availability: {
        type: String,
        default: "", // can use enum in future
    },
    status: {
        type: String,
        default: "under review",
        enum: ["under review", "cancelled", "approved"],
    },
    about: {
        type: String,
        default: "",
    },
    skills: {
        type: [String],
        default: [],
    },
    college: {
        course: {
            type: String,
            default: "",
        },
        institution: {
            type: String,
            default: "",
        },
        session: {
            type: String,
            default: "",
        }
    },
    experience: {
        profession: {
            type: String,
            default: "",
        },
        company: {
            type: String,
            default: "",
        },
        session: {
            type: String,
            default: "",
        }
    },
    score: {
        type: Number,
        default: 0,
    },
    website: {
        type: String,
        default: "",
    },
    resume: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    nextOpportunity: {
        profession: {
            type: String,
            default: "",
        },
        package: {
            type: String,
            default: "",
        }
    },
    socials: {
        linkedin: {
            type: String,
            default: "",
        },
        twitter: {
            type: String,
            default: "",
        }
    }
}, { timestamps: true })

export default mongoose.model<IProfile>("Profile", ProfileSchema);