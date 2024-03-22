import API from "./api";
import MongooseService from "./databases/MongooseService";
import DefaultChatRoom from "./api/helper/DefaultChatRoom";

(async () => {
  try {
    await MongooseService.init();
    await API.init();
    await DefaultChatRoom.init();
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
