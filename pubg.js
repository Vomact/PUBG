var allStats;
var gameID = "5b993795-4f90-48b9-997f-d70fbbf9721e";
var apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI0ZWMwZTFlMC1hNDljLTAxMzYtODNlNi0yOTE5ZjhkOWZiZGYiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTM4MDYzOTk4LCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6InZvbWFjdC1wdWJnLWNhIn0.2NwhyhlkxLhs9BKcAroEQqQKOW1mEzKl2bgrlCjflwY";

$('document').ready(function () {
    disMap = $('#disMap');
    disPlayers = $('#disPlayers');
    getStats();
});

function getStats() {
    $.ajax({
        url: "https://api.pubg.com/shards/pc-eu/matches/"+gameID,
        headers : {
            "Authorization" : "Bearer " + apiKey,
            "Accept" : "application/vnd.api+json",
        },
        async: true,
        success: function (list) {
            allStats = list;
            console.log(allStats);
            displayMap();
            displayPlayers();
        },
        error: function (error) {

        }
    })
};

function displayMap() {
    var map = allStats.data.attributes.mapName;

    disMap.html ('');
    disMap.append (map);
};

function displayPlayers() {
    var players = allStats.included;

    //Removes all non-participants from the data
    players = players.filter(function(elmt){ 
        return elmt.type === 'participant';
    })

    //Sorts players by in-game rank
    players = players.sort(function (a, b) {
        var rankA = a.attributes.stats.winPlace;
        var rankB = b.attributes.stats.winPlace;

        if (rankA < rankB) {
            return -1;
        }

        if (rankA > rankB) {
            return 1;
        }
        return 0;
    });

    //Displays the players on the page
    disPlayers.html ('');
    for ( var i = 0; i < players.length; i++) {
        disPlayers.append('<tr><td>' + players[i].attributes.stats.winPlace + ' </td><td>' + players[i].attributes.stats.name + '</td></tr>');
    }
};