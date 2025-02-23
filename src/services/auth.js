import { UsersCollection } from "../db/user";

export const registerUser = async (payload) => {
	return await UsersCollection.create(payload);
};
