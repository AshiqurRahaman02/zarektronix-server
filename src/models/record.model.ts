import mongoose, { Schema, Document } from "mongoose";

export interface IRecord extends Document {
	name:string;
	audioUrl: string;
	userId: string;
	transcript: string;
}

const recordSchema: Schema = new Schema({
	name: {
		type: String,
	},
	audioUrl: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
		ref: "User"
	},
	transcript: {
		type: String,
	},
},
{ timestamps: true });

const RecordModel = mongoose.model<IRecord>("Record", recordSchema);

export default RecordModel;
