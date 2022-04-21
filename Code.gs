  var Characters = ["Baby Mario", "Baby Peach", "Toad", "Koopa Troopa", "Mario", "Luigi", "Peach", "Yoshi", "Wario", "Waluigi", "Donkey Kong", "Bowser", "Baby Luigi", "Baby Daisy", "Toadette", "Dry Bones", "Daisy", "Birdo", "Diddy Kong", "Bowser Jr", "King Boo", "Rosalina", "Funky Kong", "Dry Bowser" ]; 

  var Mushroom = {name: "Mushroom Cup", tracks:["Luigi Circuit", "Moo Moo Meadows", "Mushroom Gorge", "Toad's Factory"]};	
  var Flower = {name: "Flower Cup", tracks:["Mario Circuit", "Coconut Mall", "DK Snowboard Cross", "Wario's Gold Mine"]};
  var Star = {name: "Star Cup", tracks:["Daisy Circuit", "Koopa Cape", "Maple Treeway", "Grumble Volcano"]};
  var Special = {name: "Special Cup", tracks:["Dry Dry Ruins", "Moonview Highway", "Bowser's Castle", "Rainbow Road"]};
  
  var Shell = {name: "Shell Cup", tracks:["GCN Peach Beach", "DS Yoshi Falls", "SNES Ghost Valley","N64 Mario Raceway"]};
  var Banana = {name: "Banana Cup", tracks:["N64 Sherbet Land", "GBA Shy Guy Beach", "DS Delfino Square", "GCN Waluigi Stadium"]};
  var Leaf = {name: "Leaf Cup", tracks:["DS Desert Hills", "GBA Bowser Castle 3", "N64 DK's Jungle Parkway", "GCN Mario Circuit"]};
  var Lightning = {name: "Lightning Cup", tracks:["SNES Mario Circuit", "DS Peach Gardens", "GCN DK Mountain", "N64 Bowser's Castle"]};
  var Custom = {name: "Custom Cup", tracks:[]}
  
  var cups = [{name: "Mushroom", data: Mushroom}, {name: "Flower", data: Flower}, {name: "Star", data: Star}, {name: "Special", data: Special}, {name: "Shell", data: Shell}, {name: "Banana", data: Banana}, {name: "Leaf", data: Leaf}, {name: "Lightning", data: Lightning}];
  var cache = CacheService.getUserCache();
  var playedTracks = [];
  
function sendTrelloApp(){
// Convert array to object
var convArrToObj = function(array){
    var thisEleObj = new Object();
    if(typeof array == "object"){
        for(var i in array){
            var thisEle = convArrToObj(array[i]);
            thisEleObj[i] = thisEle;
        }
    }else {
        thisEleObj = array;
    }
    return thisEleObj;
}


Logger.log(Session.getActiveUser().getEmail());
  var url = 'https://script.google.com/a/bindmedia.co.uk/macros/s/AKfycby523SwTBvKuyaUz3gPAxs109TwleUTvJZaQ-EVWEHYAYSI2A8/exec';
 // var payload = {func:"createCustomCard", arg1:"Test", arg2:"Testing", arg3:"top", arg4:"Josh"] };
  var payload = {func:"createCustomCard", args:["Test", "Testing", "Top", "Josh"] };
  payload.args = JSON.stringify(convArrToObj(payload.args))
  var options = {'method': 'post', "muteHttpExceptions": true,
                  'payload': payload};
  Logger.log(JSON.stringify(payload));
                  
  var post = UrlFetchApp.fetch(url, options)
  
  Logger.log(post);

}

  
function doGet() {
  return HtmlService.createTemplateFromFile("index").evaluate();
}

function saveToUserCache(val) {
  Logger.log(val);
  cache.put('playedTracks', val);
}

function getFromUserCache() {
 var tracks = cache.get('playedTracks');
 return tracks;
}

function RandomCharacter() {
  var randChar = RandomChar();
  var character = Characters[randChar];
  
  Logger.log(character);
  return character;
}

function AllRandom(tracks) {

  
  var randCup = RandomCup();
  var randTrack = RandomTrack();
  //Logger.log(randCup);
  //Logger.log(randTrack);
  var cup = cups[randCup].data;
  var track = cup.tracks[randTrack];

  tracks.forEach(function(pt){
    if(track.indexOf(pt) == -1){
      
    }
  })
  
  Logger.log(cup.name + " - " + track);
  playedTracks.push(track);
  saveToUserCache(playedTracks);
  
  return (cup.name + " - " + track);
  
}

function CupRandom(cupString){
  //var cupString = "Mushroom";
  var result;
  cups.forEach(function(c){
    if(c.name == cupString){
      
      var cup = c.data;
      Logger.log(cup);
      var cupName = cup.name;
      var randTrack = RandomTrack();
      Logger.log(randTrack);
      var track = cup.tracks[randTrack];
      Logger.log(track);
      //if(playedTracks.indexOf(track) > -1){
      //  Logger.log("Track Already Played, Recalculating");
      //} else {
      Logger.log(cupName + " - " + track);
      //playedTracks.push(track);
      saveToUserCache(track);
      result = cupName + " - " + track;
      
    }
  });
  
  return result;

}

function playedTracksList() {
Logger.log(cache.get('foo'));
  return playedTracks;
}

function RandomCup() {
  return Math.floor(Math.random() * 8);
}

function RandomTrack() {
  return Math.floor(Math.random() * 3);
}

function RandomChar() {
  return Math.floor(Math.random() * 8);
}

function testing(tracks) {
  
  //var tracks = ["Luigi Circuit", "Moo Moo Meadows", "Mushroom Gorge", "Toad's Factory"];
  var repeat = false;
  
  
    var randCup = RandomCup();
    var randTrack = RandomTrack();
    //Logger.log(randCup);
    //Logger.log(randTrack);
    var cup = cups[randCup].data;
    var track = cup.tracks[randTrack];
  

    Logger.log("Original Choice: " + cup.name + " - " + track);
    tracks.forEach(function(pt){
      if(track.indexOf(pt) != -1){
        //track matches pt:
        Logger.log("Track already played: " + track +  " " + pt);
        repeat = true;
        //return testing();
      } else {
        Logger.log(pt);
      }
    })
  
  
  if(repeat == true) {
     testing();
  } else {
    Logger.log("Final Choice: " + cup.name + " - " + track);
    return cup.name + " - " + track;
  }
}