const fs = require("fs");
const { normalizeAndDenormalize } = require("../../../utils/normalizr");

module.exports = class MessagesDAOFile {
  constructor(file) {
    this.file = file;
  }
  async saveChat(message) {
    try {
      // Normalize data for saving
      const messagesNormalized = normalizeAndDenormalize("normalize", message);

      await fs.promises.writeFile(
        this.file,
        JSON.stringify(messagesNormalized)
      );
    } catch (err) {
      console.log("Error saveChat at DAO" + err);
    }
  }

  async getChat() {
    try {
      const message = await fs.promises.readFile(this.file);
      const messageList = JSON.parse(message);

      // Denormalize
      const messagesDenormalized = normalizeAndDenormalize(
        "denormalize",
        messageList
      );

      return messagesDenormalized;
    } catch (err) {
      console.log("Error getChat at DAO" + err);
    }
  }
};
