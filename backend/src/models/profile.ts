import { InferSchemaType, Schema, model } from "mongoose";

const profileSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, select: false },
        password: { type: String, required: true, select: false },
    },
    {
        timestamps: true,
    }
);

type Profile = InferSchemaType<typeof profileSchema>;

export default model<Profile>("Profiles", profileSchema);
