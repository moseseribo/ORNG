const os = require("os")
const ipc = require('electron').ipcRenderer // we need to talk
require('events').EventEmitter.prototype._maxListeners = 0;

var osSpec = os.release();
var divElements = document.querySelectorAll(".app-contain");
var iconDivElement = document.getElementById('move'); //this div moves the icon around... cool huh?
var imageElement = document.createElement('img');
imageElement.setAttribute('width','125')
imageElement.setAttribute('height','125')
//does what it says on the tin... kinda... This function gives the div elemts a tag number == i
function createDivs(){
  for(var i = 0; i < divElements.length;i++){
    divElements[i].id = 'info-'+i
  }
}
function getInfo(){
  //new date object
  const d = new Date()
  /**
  using ternary to check if a number during a count is less than 10 implying less than two digits long
  if this is the case the elese clause of the operator appends a single 0 to the begining of the number
  **/
  function getTime(){
      divElements[0]
        .innerHTML =
            (d.getHours() > 9 ? d.getHours() : "0"+d.getHours())+":" //if hour is less than 9 append 0 to front i.e 9 becomes 09
          + (d.getMinutes() > 9 ? d.getMinutes() : "0"+d.getMinutes()) +":"
          + (d.getSeconds() > 9 ? d.getSeconds() : "0"+d.getSeconds())
          //setTimeout(getTime,1000)
  }

  //concatenates then appends as string to div
  function getDate(){
    divElements[1]
      .innerHTML =
            "."+(d.getDate() > 9 ? d.getDate() : '0'+d.getDate())+" ."
          + ((d.getMonth()+1) > 9 ? (d.getMonth()+1) : '0'+(d.getMonth()+1) )+" ."
          + d.getFullYear()
          //setTimeout(getDate,360000)
    //divElements[3].innerHTML = Math.floor(os.freemem()/1000000000)+"/"+Math.floor((os.totalmem()/1000000000) -1)
  }
  //get the date and time duh
  getDate()
  getTime()

}
//does what it says on the tin
function getSystemInfo() {
  divElements[4].innerHTML = (os.platform() == 'win32' ? 'windows':'windows')
}
//
function getWeatherIcon(id){
  /**
  see https://openweathermap.org/weather-conditions
  id is passed and concatenated to file path.. this is good for two reasons:
  1.because of the icon naming convention i don't need 9 if else clauses to
  append a damn image...
  2.reason 1 is all i got
  **/
    imageElement.setAttribute('src','./assets/weather-icons/all/_'+id+'.svg');
    imageElement.setAttribute('id','weather-icon');
    iconDivElement.appendChild(imageElement);
}
function getWeatherInfo() {
  ipc.send('get-weather','sent')
  ipc.on('show-weather-main',(event, arg) => {
    //recieved object is added to html
    divElements[5].innerHTML = arg[0]; //dublin
    divElements[6].innerHTML = arg[1]; //rain
    divElements[7].innerHTML = arg[2]; //light rain
    divElements[8].innerHTML = arg[3]; //17
    //divElements[9].innerHTML = arg[4]; //10d
    //passes icon code to new function
    getWeatherIcon(arg[4])
  })
  setTimeout(getWeatherInfo,3600000)
}

// create div elements

createDivs()
setInterval(getInfo, 1000)
getSystemInfo()
getWeatherInfo()
//setInterval(getWeatherInfo, 3600000)

//getInfo()
