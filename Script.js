// Nidal Faurass : https://www.facebook.com/nidal.faurass.3/
// All Rights Reserved - Nidal Faurass

jQuery(function($) {
  'use strict'
  var supportsAudio = !!document.createElement('audio').canPlayType;
  if (supportsAudio) {
    var index = 0,
      playing = false,
      mediaPath = 'https://archive.org/23/items/NFaurassImDr/',
      extension = '',
      tracks = [{
        "track": 1,
        "name": "Imagine Dragons - Believer",
        "duration": "3:36",
        "file": "Imagine%20Dragons%20-%20Believer"
      }, {
        "track": 2,
        "name": "Imagine Dragons - I Bet My Life",
        "duration": "3:33",
        "file": "Imagine%20Dragons%20-%20I%20Bet%20My%20Life"
      }, {
        "track": 3,
        "name": "Imagine Dragons - Radioactive",
        "duration": "4:21",
        "file": "Imagine%20Dragons%20-%20Radioactive"
      }, {
        "track": 4,
        "name": "Imagine Dragons - Thunder",
        "duration": "3:24",
        "file": "Imagine%20Dragons%20-%20Thunder"
      }, {
        "track": 5,
        "name": "Imagine Dragons - Warriors",
        "duration": "2:36",
        "file": "Imagine%20Dragons%20-%20Warriors"
      }, {
        "track": 6,
        "name": "Imagine Dragons - Whatever It Takes",
        "duration": "3:39",
        "file": "Imagine%20Dragons%20-%20Whatever%20It%20Takes"
      }],
      buildPlaylist = $(tracks).each(function(key, value) {
        var trackNumber = value.track,
          trackName = value.name,
          trackDuration = value.duration;
        if (trackNumber.toString().length === 1) {
          trackNumber = "0" + trackNumber;
        }
        $("#plList").append(
          '<li><div class="plItem"><span class="plNum">' +
          trackNumber +
          '.</span><span class="plTitle">' +
          trackName +
          '</span><span class="plLength">' +
          trackDuration +
          "</span></div></li>"
        );
      }),
      trackCount = tracks.length,
      npAction = $("#npAction"),
      npTitle = $("#npTitle"),
      audio = $("#audio1")
      .on("play", function() {
        playing = true;
        npAction.text("Now Playing...");
      })
      .on("pause", function() {
        playing = false;
        npAction.text("Paused...");
      })
      .on("ended", function() {
        npAction.text("Paused...");
        if (index + 1 < trackCount) {
          index++;
          loadTrack(index);
          audio.play();
        } else {
          audio.pause();
          index = 0;
          loadTrack(index);
        }
      })
      .get(0),
      btnPrev = $("#btnPrev").on("click", function() {
        if (index - 1 > -1) {
          index--;
          loadTrack(index);
          if (playing) {
            audio.play();
          }
        } else {
          audio.pause();
          index = 0;
          loadTrack(index);
        }
      }),
      btnNext = $("#btnNext").on("click", function() {
        if (index + 1 < trackCount) {
          index++;
          loadTrack(index);
          if (playing) {
            audio.play();
          }
        } else {
          audio.pause();
          index = 0;
          loadTrack(index);
        }
      }),
      li = $("#plList li").on("click", function() {
        var id = parseInt($(this).index());
        if (id !== index) {
          playTrack(id);
        }
      }),
      loadTrack = function(id) {
        $(".plSel").removeClass("plSel");
        $("#plList li:eq(" + id + ")").addClass("plSel");
        npTitle.text(tracks[id].name);
        index = id;
        audio.src = mediaPath + tracks[id].file + extension;
      },
      playTrack = function(id) {
        loadTrack(id);
        audio.play();
      };
    extension = audio.canPlayType("audio/mpeg") ? ".mp3" :
      audio.canPlayType("audio/ogg") ? ".ogg" : "";
    loadTrack(index);
  }
});

// initialize plyr
plyr.setup($("#audio1"), {});
