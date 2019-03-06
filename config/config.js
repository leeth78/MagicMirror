var config = {
  address : "localhost",
  port : 8080,
  ipWhitelist : ["127.0.0.1", "::ffff:127.0.0.1", "::1"],
  language : "ko",
  timeFormat : 12,
  units : "metric",

  modules : [
    {
      module: "MMM-Remote-Control-Repository",
    },
    {
      module : "alert",
    },
    {
      module : "updatenotification",
      position : "top_bar"
    },
    {
      module : "clock",
      position : "top_left",
      config : {
        dateFormat : "LL dddd",
      }
    },
    {
      module: "helloworld",
      position: "bottom_bar",	// This can be any of the regions.
      config: {
      // See 'Configuration options' for more information.
        text: "JJ VINA Automation"
      }
    },
    {
      module : "calendar",
      header : "KR Holidays",
      position : "top_left",
      config : {
        //urgency : 21,
        fetchInterval : 3600000, // reload time
        maximumEntries : 5,  // display Ea
        calendars : [
          {
            symbol : "대한민국 공휴일",
            url : "https://calendar.google.com/calendar/ical/ko.south_korea%23holiday%40group.v.calendar.google.com/public/basic.ics"
          }
        ]
      }
    },
    {
    module: 'MMM-NetworkConnection',
    position: 'top_left',
    config: {}
    },
    {
      module : "currentweather",
      position : "top_right",
      config : {
        location : "Bac Ninh, VN", //https://openweathermap.org/ 에서 지역을 찾으세요.
        locationID : "",
        appid : "844d47d65d5ec92282c1f32c510def47" //openweathermap.org의 API key를 입력하세요.
      }
    },
    {
      module : "weatherforecast",
      position : "top_right",
      config : {
        location : "Bac Ninh, VN", //https://openweathermap.org/ 에서 지역을 찾으세요.
        locationID : "",
        appid : "844d47d65d5ec92282c1f32c510def47" //openweathermap.org의 API key를 입력하세요.
      }
    },
    {
      module : "compliments",
      position : "lower_third",
      config : {
        compliments : {
          anytime : ["오늘도 좋은 하루!"],
          morning : ["좋은 아침!", "힘찬 아침!", "잘 잤나요?"],
          afternoon : ["안녕하세요!", "멋져요!", "잘 지내고 있나요!"],
          evening : ["와우! 잘 지냈나요?", "멋져보이네요!", "반가워요!"],
          day_sunny : ["맑은 낮"],
          day_cloudy : ["흐린 낮"],
          cloudy_windy : ["흐리고 바람"],
          showers : ["소나기"],
          rain : ["비"],
          thunderstorm : ["천둥번개"],
          snow : ["눈"],
          fog : ["안개"],
          night_clear : ["맑은 밤"],
          night_cloudy : ["흐린 밤"],
          night_showers : ["소나기 밤"],
          night_rain : ["비오는 밤"],
          night_thunderstorm : ["천둥번개 밤"],
          night_snow : ["눈오는 밤"],
          night_alt_cloudy_windy : ["흐리고 바람부는 밤"]
        }
      }
    },
    {
      module : "MMM-NotificationTrigger",
      config : {
        useWebhook : false,
        triggers : [
          {
            trigger : "ASSISTANT_ACTION",
            triggerSenderFilter : function (sender) {
              console.log(sender)
              if (sender.name == "MMM-AssistantMk2") {
                  return true;
              }
              else {
                return false;
              }
            },
            triggerPayloadFilter: function (payload) {
              console.log(playload)
              return true;
            },
            fires: [
              {
                fire: "SHOW_ALERT",
                payload: function (payload) {
                  return {
                    type: "notification",
                    title: payload.type,
                    message: payload.command
                  };
                },
              },
            ],
          },
          {
            trigger: "ASSISTANT_HOOK",
            fires: [
              {
                fire: "SHOW_ALERT",
                payload: function (payload) {
                  return {
                    title: "HOOK",
                    message: "Are you saying " + payload.hook + "?",
                    timer: 5000
                  };
                },
              },
            ],
          },
          {
            trigger: "HOTWORD_DETECTED",
            fires: [
              {
                fire: "HOTWORD_PAUSE"
              },
              {
                fire: "ASSISTANT_ACTIVATE",
                payload: function (payload) {
                  return {
                    "profile": payload.hotword
                  };
                },
                delay: 500
              },
            ]
          },
          {
            trigger: "ASSISTANT_DEACTIVATED",
            fires: [
              {
                fire: "HOTWORD_RESUME"
              }
            ]
          }//,
        ]
      }
    },
    {
      module: "MMM-Hotword",   //https://snowboy.kitt.ai/ 에서 쉽게 자신만의 음성 인식 모듈 제작 가능
      config: {
        snowboy: [
          {
            hotwords: "smartmirror",
            file: "resources/models/smart_mirror.umdl",
            sensitivity: '1.0',  //"스마트미러" 마이크 감도 조절
          },
          {
            hotwords: "snowboy",
            file: "resources/models/snowboy.umdl",
            sensitivity: '1.0',  //"스노우보이" 마이크 감도 조절
          },
          {
            file: 'resources/models/jarvis.umdl',
            sensitivity: '0.6,0.60',   //"자비스" 마이크 감도 조절
            hotwords: ['jarvis', 'jarvis']
          }
        ],
//        record: {
//          sampleRate    : 16000,      // audio sample rate
//          threshold     : 0.5,        // silence threshold (rec only)
//          thresholdStart: null,       // silence threshold to start recording, overrides threshold (rec only)
//          thresholdEnd  : null,       // silence threshold to end recording, overrides threshold (rec only)
//          silence       : 1.0,        // seconds of silence before ending
//          verbose       : false,      // log info to the console. Use this when you want to check mic working or not.
//          recordProgram : 'arecord',  // Defaults to 'arecord' - also supports 'rec' and 'sox'
//          device        : 'plughw:1,0'        // recording device (e.g.: 'plughw:1')
//        },
//        autostart: true,              // if 'false', this module will wait for 'HOTWORD_RESUME' notification to start hotwords detection at the beginning.
//        autorestart: false,          // You can set this 'true' when you want this module to go back to listening mode automatically again after hotword is detected. But use this carefully when your other modules are using microphone or speaker.

        //// customizable notification trigger
//        notifications: {
//          PAUSE: "HOTWORD_PAUSE",
//          RESUME: "HOTWORD_RESUME",
//          LISTENING : "HOTWORD_LISTENING",
//          SLEEPING : "HOTWORD_SLEEPING",
//          ERROR : "HOTWORD_ERROR",
//        },
//        onDetected: {
//          notification: (payload) => {
//            return "HOTWORD_DETECTED"
//          },
//          payload: (payload) => {
//            return payload
//          }
//        },
      }
    },
    {
      module: "MMM-AssistantMk2",
      position: "top_center",
      config: {
        useScreen: true,
        deviceLocation: {
          coordinates: {
            latitude: 37.57,
            longitude: 126.98
         },
        },
//        transcriptionHook: {
//          "UNICORN": "unicorn"
//        },
        profiles: {
          "default": {
            lang: "ko-KR"
          },
        }
      }
    },
//    {
//      module: "MMM-wiki",
//      position: "top_center",
//      config: {
//        updateInterval: 30000,
//        language: "ko",
//        characterLimit: 200,
//        //badTitles: ["Graphical","timeline", "List"],
//        //badContents: ["This article", "See also", "redirects here", "The following outline", "may refer to"]//,
//      }//,
//    },
    {
      module: 'MMM-Tools',
      position: 'top_left',
      config: {
        device : "RPI", // "ATB or RPI" is also available
        refresh_interval_ms : 10000,
        warning_interval_ms : 1000 * 60 * 5,
        enable_warning : true,
      warning : {
        CPU_TEMPERATURE : 65,
        GPU_TEMPERATURE : 65,
        CPU_USAGE : 75,
        STORAGE_USED_PERCENT : 80,
        MEMORY_USED_PERCENT : 80
        },
      warning_text: {
        CPU_TEMPERATURE : "The temperature of CPU is over %VAL%",
        GPU_TEMPERATURE : "The temperature of GPU is over %VAL%",
        CPU_USAGE : "The usage of CPU is over %VAL%",
        STORAGE_USED_PERCENT : "The storage is used over %VAL% percent",
        MEMORY_USED_PERCENT : "The memory is used over %VAL% percent",
        }
      }
    },
 
  ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
  module.exports = config;
}