import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		email: {
			type: String,
		},
		isFavourite: {
			type: Boolean,
			default: false,
		},
		contactType: {
			type: String,
			enum: ["work", "home", "personal"],
			required: true,
			default: "personal",
		},
		parentId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
		photo: { type: String },
	},
	{ timestamps: true, versionKey:false }
);

const Contacts = mongoose.model("Contact", contactSchema);

export default Contacts;
