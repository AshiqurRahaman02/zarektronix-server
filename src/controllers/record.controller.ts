import cloudinary from "cloudinary";
import { Request, Response } from "express";
import RecordModel, { IRecord } from "../models/record.model";

export const getRecords = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;

		if (!userId) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}
		const records = await RecordModel.find({ userId });
		res.status(200).json({ isError: false, records });
	} catch (error) {
		res.status(500).json({ isError: true, message: error });
	}
};

function uploadAudioToCloudinary(file: any) {
	return new Promise((resolve, reject) => {
		cloudinary.v2.uploader.upload(
			file.tempFilePath,
			{ resource_type: "auto" },
			(error: any, result: any) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			}
		);
	});
}
export const addRecord = async (req: Request, res: Response) => {
	try {
		const userId = req.user?._id;

		if (!userId) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}
		const { audio }: any = req.files;
		const { name, transcript } = req.body;

		const audioUploadResult: any = await uploadAudioToCloudinary(audio);

		let record = new RecordModel({
			name,
			audioUrl: audioUploadResult.url,
			userId,
			transcript,
		});
		await record.save();
		res.status(200).json({ isError: false, record });
	} catch (error) {
		res.status(500).json({ isError: true, message: error });
	}
};


export const deleteRecord = async (req: Request, res: Response)=> {
	try {
		const userId = req.user?._id;
		const {id} = req.params

		if (!userId) {
			return res.status(500).json({
				isError: true,
				message: "Internal Server Error",
			});
		}
		const records = await RecordModel.findByIdAndDelete(id);
		res.status(200).json({ isError: false, message :"Recording deleted successfully" });
	} catch (error) {
		res.status(500).json({ isError: true, message: error });
	}
}