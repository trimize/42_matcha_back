const Messages = require('../models/Messages/Messages.js');
const PusherService = require('./PusherService.js');
const NotificationService = require('./NotificationService.js');

exports.getMessagesByUserId = async (userId, friendId) => {
	try {
		const messages = await Messages.getMessagesByUserId(userId, friendId);
		await PusherService.requestStatus(userId);

		return messages;
	} catch (error) {
		console.error('Failed to fetch messages', error);
		throw new Error('Failed to fetch messages');
	}
}

exports.createMessage = async (senderId, receiverId, content) => {
	try {
		const message = await Messages.createMessage(senderId, receiverId, content, null);
		await PusherService.sendMessage(message);
		await NotificationService.newMessageNotification(receiverId, senderId);
		return message;
	} catch (error) {
		console.error('Failed to create message', error);
		throw new Error('Failed to create message');
	}
}

exports.createDateMessage = async (senderId, receiverId, content, dateId) => {
	try {
		const message = await Messages.createMessage(senderId, receiverId, content, dateId);
		return message;
	} catch (error) {
		console.error('Failed to create date message', error);
		throw new Error('Failed to create message');
	}
}

exports.readAllMessages = async (userId, friendId) => {
	try {
		const result = await Messages.readAllMessages(userId, friendId);
		return result;
	} catch (error) {
		console.error('Failed to read messages', error);
		throw new Error('Failed to read messages');
	}
}