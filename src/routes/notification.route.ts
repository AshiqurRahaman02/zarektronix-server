import express from "express";
import {
	getUserNotifications,
	markAllAsReadNotifications,
	markAsReadNotification,
} from "../controllers/notification.controller";

const notificationRouter = express.Router();

notificationRouter.get("/user-notifications", getUserNotifications);
notificationRouter.put("/mark-as-read/:id", markAsReadNotification);
notificationRouter.put("/mark-all-as-read", markAllAsReadNotifications);

export default notificationRouter;