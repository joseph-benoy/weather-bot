function sendReply(data){
  const endPoint = "https://api.telegram.org/bot<Bot_token>/sendMessage";
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
  const endPoint = "https://api.telegram.org/bot<Bot_token>/sendChatAction";
  const options = {
    method : "post",
    contentType: 'application/json',
    payload:JSON.stringify(data)
  };
  const response = UrlFetchApp.fetch(endPoint,options);
}
function getData(city){
  try{
  let response = UrlFetchApp.fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=<Openweather_api_key>&units=metric`,{muteHttpExceptions: true,}).getContentText();
  let data = JSON.parse(response);
  let weatherData = `*${city}*\n*Longitute : * ${data.coord.lon}'\n*Latitude : *${data.coord.lat}'\n*Weather : *${data.weather[0].description}\n*Temperature Felt : *${data.main.feels_like}'C\n*Minimum Temprature : *${data.main.temp_min}'C\n*Maximum Temprature : *${data.main.temp_max}'C'\n*Humidity : *${data.main.humidity}%\n*Wind Speed : *${data.wind.speed} meter/sec`;
  return weatherData;
  }
  catch(err){
    return "*City not found!*\nPlease try another one."
  }
}

function doPost(e){
  const update = JSON.parse(e.postData.contents);
  const messageText = update.message.text;
  const chatId = update.message.chat.id;
  const fullName = update.message.from.first_name+" "+update.message.from.last_name;
  let data = {};
  if(messageText=="/start"){
        sendChatAction(chatId);
        data = {
        text : `*Hello ${fullName}!*\nSend us the name of your city and we will let you know about the weather there!`,
        parse_mode : "markdown",
        chat_id : chatId,
    };
  }
  else{
    let weatherData = getData(messageText);
    sendChatAction(chatId);
    data = {
      text : weatherData,
      parse_mode : "markdown",
      chat_id : chatId,
    };
  }
  sendReply(data);
}
