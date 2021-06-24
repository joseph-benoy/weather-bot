function sendReply(data){
  const endPoint = "https://api.telegram.org/bot1881370155:AAEx5QW5uWDB0l5EYwKBafiWKra8ypMe0a0/sendMessage";
  const options = {
    method : "post",
    contentType: 'application/json',
    payload:JSON.stringify(data)
  };
  const response = UrlFetchApp.fetch(endPoint,options);
}
function sendChatAction(chatId){
  let data = {
    chat_id:chatId,
    action:'typing'
  };
  const endPoint = "https://api.telegram.org/bot1881370155:AAEx5QW5uWDB0l5EYwKBafiWKra8ypMe0a0/sendChatAction";
  const options = {
    method : "post",
    contentType: 'application/json',
    payload:JSON.stringify(data)
  };
  const response = UrlFetchApp.fetch(endPoint,options);
}
function doPost(e){
  const update = JSON.parse(e.postData.contents);
  const messageText = update.message.text;
  const chatId = update.message.chat.id;
  const fullName = update.message.from.first_name+" "+update.message.from.last_name;
  let data = {};
  if(messageText=="/start"){
        sendChatAction(chatId);
        let btnMarkup = {
          resize_keyboard: true,
          one_time_keyboard: true,
          keyboard: [['Get updates'],['Stop updates']]
        };
        data = {
        text : `*Hello ${fullName}!*\nWe will update you with latest news around the globe in *Malayalam*`,
        parse_mode : "markdown",
        chat_id : chatId,
        reply_markup : btnMarkup
    };
  }
  sendReply(data);
}