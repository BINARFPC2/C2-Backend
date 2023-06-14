const { notification, user } = require("../models");
const { v4: uuid } = require("uuid");

module.exports = {
  async createNotification(req, res) {
    const { userId, info, message } = req.body;

    try {
      await user.findByPk(userId);
    } catch (error) {
      return res.status(404).json({
        status: "Not Found",
        message: "User does not exist",
      });
    }

    await notification.create({
      userId,
      info,
      message,
      date: new Date(),
      isRead: false,
    });

    return res.status(201).json({
      status: "Created",
      message: "Notification created",
    });
  },

  async readNotification(req, res) {
    const { userId, notificationId } = req.query;

    await notification.update(
      {
        isRead: true,
      },
      {
        where: {
          userId,
          id: notificationId,
        },
      }
    );

    return res.status(200).json({
      status: "OK",
    });
  },

  async getAllNotification(req, res) {
    const { userId } = req.query;

    const notifications = await notification.findAll({
      where: {
        userId,
        isRead: false,
      },
    });

    return res.status(200).json(notifications);
  },
};
