const fs = require("fs");
const { normalizeAndDenormalize } = require("../utils/normalizr");

class ApiChat {
  async writeChatToFile(message) {
    try {
      const messagesNormalized = normalizeAndDenormalize("normalize", message);

      await fs.promises.writeFile(
        "./data/chat.json",
        JSON.stringify(messagesNormalized)
      );
    } catch (err) {
      console.log("ERROR: Can't write file. " + err);
    }
  }

  async readChatFromFile() {
    try {
      const message = await fs.promises.readFile("./data/chat.json");
      const messageList = JSON.parse(message);
      const messagesDenormalized = normalizeAndDenormalize(
        "denormalize",
        messageList
      );
      return messagesDenormalized;
    } catch (err) {
      console.log("ERROR: Can't read file. " + err);
    }
  }
}

module.exports = ApiChat;
