var arraydestreams = [];
var contadorelemento = document.getElementById("contador");
var contadoronline = document.getElementById("contadorONLINE");
var contadoroffline = document.getElementById("contadorOFFLINE");
var contadortotalonlne = 0;
var contadorofline = 0;
$(document).ready(function() {
  "use strict";
  console.log("activate");
  /* Navigation Tabs - Show and Hide 
     ================================== */
  $("#twitchTabs a").on("click", function(e) {
    e.preventDefault();
    if (!$(this).hasClass("active")) {
      $(".tab-pane").removeClass("active");
      $(".tab-pane").addClass("hide");
      $(this).tab("show");
    }
  });
  /* END Navigation Tabs - Show and Hide */

  /* Search Streamer Function 
     ================================== */
  $("#search").on("keyup", function() {
    const value = $(this)
      .val()
      .toLowerCase();
    $(".tab-pane .col-8").filter(function() {
      $(this)
        .parent()
        .toggle(
          $(this)
            .text()
            .toLowerCase()
            .indexOf(value) > -1
        );
    });
  });

  /*  END Search Streamer Function */

  /* Populate Streamer
     ================================== */

  /* List of Streamers */

  let api = "";

  /*if (contadorelemento) {
    contadorelemento.innerHTML = streamers.length;
  }*/
  var apiChannelData = [];
  /* Iterating thru list */
});
async function getUserAsync() {
  let response = await fetch(
    `https://api.twitch.tv/helix/streams?game_id=21779&token=twf2yfqq6qgl1l5heghz6b3nz57zcz&first=100`,
    {
      headers: {
        "Client-ID": "wiigcdymn306y0db5x29f8do8o60ho",
        Accept: "application/vnd.twitchtv.v5+json",
        Authorization: "Bearer twf2yfqq6qgl1l5heghz6b3nz57zcz",
      },
    }
  );
  let data = await response.json();
  return data.data;
}

async function obtenervalor(idstream) {
  let response = await fetch(
    `https://api.twitch.tv/helix/users?login=${idstream}&token=twf2yfqq6qgl1l5heghz6b3nz57zcz`,
    {
      headers: {
        "Client-ID": "wiigcdymn306y0db5x29f8do8o60ho",
        Accept: "application/vnd.twitchtv.v5+json",
        Authorization: "Bearer twf2yfqq6qgl1l5heghz6b3nz57zcz",
      },
    }
  );
  let data = await response.json();
  return data.data;
}
async function prueba() {
  const loolplayers = await getUserAsync();
  console.log(loolplayers);
  //const valor = await obtenervalor(loolplayers.user_id);
  //console.log(valor);
  loolplayers.sort(function(a, b) {
    var nameA = a.user_name.toLowerCase(),
      nameB = b.user_name.toLowerCase();
    if (nameA < nameB)
      //sort string ascending
      return -1;
    if (nameA > nameB) return 1;
    return 0; //default return value (no sorting)
  });
  if (contadorelemento) {
    contadorelemento.innerHTML = loolplayers.length;
  }
  for (const file of loolplayers) {
    const contents = await obtenervalor(file.user_name);
    console.log(contents);

    var htmlContent = `<div class='row'><div class='col-2'><img src='${
      contents[0].profile_image_url
    }'></div><div class='col-8'><a target='_blank' href='http://twitch.tv/${file.user_name.toLowerCase()}'>`;

    /* If Streamer is Online */
    if (file.is_live != false) {
      contadortotalonlne++;
      htmlContent +=
        "<h5>" +
        file.user_name +
        "<span>LIVE</span></h5> <h6> Views: " +
        file.viewer_count +
        "</h6></a><h6>Title: " +
        file.title +
        "</h6></div><div class='col-2 margenesaautodiv'> <div class='circle-active'> <a href='https://twitter.com/intent/tweet?text=Estoy%20viendo%20a%20http://twitch.tv/" +
        file.user_name.toLowerCase() +
        "' target='_blank' class='paraellogodetwitter'><i class='fab fa-twitter fa-2x'></i>            </a></div>    </div> </div> ";
      $("#online").append(htmlContent);
      $("#all").append(htmlContent);
    } else {
      contadorofline++;

      /* If Streamer is Offline */
      htmlContent +=
        "<h5>" +
        file.user_name +
        "</h5></a><h6>Last Stream: " +
        file.is_live +
        "</h6></div><div class='col-2'><div class='circle'></div></div></div>";
      $("#offline").append(htmlContent);
      $("#all").append(htmlContent);
    }
    if (contadoronline) {
      contadoronline.innerHTML = contadortotalonlne;
    }
    if (contadoroffline) {
      contadoroffline.innerHTML = contadorofline;
    }
  }
}
prueba();
