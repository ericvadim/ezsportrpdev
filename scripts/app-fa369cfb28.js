!function(){"use strict";angular.module("app",["ngAnimate","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ui.router","ui.bootstrap","toastr"])}(),function(){"use strict";function e(e){var t=this;t.fghfhh=[],e.tabVisible=!0}e.$inject=["$rootScope"],angular.module("app").controller("StatsController",e)}(),function(){"use strict";function e(e){var t=this;t.fgfd=[],e.tabVisible=!0}e.$inject=["$rootScope"],angular.module("app").controller("SelectLineupController",e)}(),function(){"use strict";function e(e){var t=this;t.dfghd=[],e.tabVisible=!0}e.$inject=["$rootScope"],angular.module("app").controller("ScorecardController",e)}(),function(){"use strict";function e(e){var t=this;t.player={name:"Andres iniesta",club:"Club",city:"City name, CA",age:"26(11 may 1984)",height:"170cm",weight:"65kg",comment:"Lorem ipsum dolor sit amet, has mandamus sapientem an. Dicam accumsan definitionem nam ut, ius oblique salutandi reformidans in.Lorem ipsum dolor sit amet, has mandamus sapientem an. Dicam accumsan definitionem nam ut, ius oblique salutandi reformidans in.Lorem ipsum dolor sit amet, has mandamus sapientem an. Dicam accumsan definitionem nam ut, ius oblique salutandi reformidans in.Lorem ipsum dolor sit amet, has mandamus sapientem an. Dicam accumsan definitionem nam ut, ius oblique salutandi reformidans in.Lorem ipsum dolor sit amet, has mandamus sapientem an. Dicam accumsan definitionem nam ut, ius oblique salutandi reformidans in.Lorem ipsum dolor sit amet, has mandamus sapientem an. Dicam accumsan definitionem nam ut, ius oblique salutandi reformidans in."},e.tabVisible=!0}e.$inject=["$rootScope"],angular.module("app").controller("PlayerController",e)}(),function(){"use strict";function e(e){var t=this;t.legends=[{title1:"Score",title2:"0 - 0"},{title1:"Period",title2:"1st"},{title1:"Start",title2:"00:00"},{title1:"Finish",title2:"Game"}],e.tabVisible=!1}e.$inject=["$rootScope"],angular.module("app").controller("PlayActivityController",e)}(),function(){"use strict";function e(e){var t=this;t.players=[{role:"GOL",team1:"M.Santiago",team2:"J.Santiago"},{role:"DEF",team1:"L.Lameira",team2:"M.Andres"},{role:"DEF",team1:"P.Silva",team2:"T.Benito"},{role:"DEF",team1:"R.Falcao",team2:"F.Cuevas"},{role:"DEF",team1:"R.Da Silva",team2:"R.morend"},{role:"MID",team1:"M.Santiago",team2:"J.Santiago"},{role:"MID",team1:"L.Lameira",team2:"M.Andres"},{role:"MID",team1:"P.Silva",team2:"T.Benito"},{role:"OFF",team1:"R.Falcao",team2:"F.Cuevas"},{role:"OFF",team1:"R.Da Silva",team2:"R.Moreno"},{role:"OFF",team1:"R.Arastes",team2:"J.Santiago"}],e.tabVisible=!0}e.$inject=["$rootScope"],angular.module("app").controller("MatchLineupController",e)}(),function(){"use strict";function e(e){var t=this;t.matches=[{team1:{name:"Team1",image:"./assets/images/temp/team1.png"},team2:{name:"Team2",image:"./assets/images/temp/team2.png"},ymd:"12/06",city:"City Here"},{team1:{name:"Team1",image:"./assets/images/temp/team1.png"},team2:{name:"Team2",image:"./assets/images/temp/team2.png"},ymd:"12/06",city:"City Here"},{team1:{name:"Team1",image:"./assets/images/temp/team1.png"},team2:{name:"Team2",image:"./assets/images/temp/team2.png"},ymd:"12/06",city:"City Here"},{team1:{name:"Team1",image:"./assets/images/temp/team1.png"},team2:{name:"Team2",image:"./assets/images/temp/team2.png"},ymd:"12/06",city:"City Here"},{team1:{name:"Team1",image:"./assets/images/temp/team1.png"},team2:{name:"Team2",image:"./assets/images/temp/team2.png"},ymd:"12/06",city:"City Here"},{team1:{name:"Team1",image:"./assets/images/temp/team1.png"},team2:{name:"Team2",image:"./assets/images/temp/team2.png"},ymd:"12/06",city:"City Here"}],e.tabVisible=!0}e.$inject=["$rootScope"],angular.module("app").controller("MatchController",e)}(),function(){"use strict";function e(e,t){var a=this;a.navbarVisible=!1,a.menus=[{label:"Home",icon:"home",url:"dashboard"},{label:"Club / League Information",icon:"th-large",url:""},{label:"Team(s)",icon:"th",url:""},{label:"Players",icon:"list",url:""},{label:"Fields",icon:"headphones",url:""},{label:"matches",icon:"tasks",url:""},{label:"Statistics",icon:"stats",url:""}],a.tabs=[{label:"TEAM",icon:"th",active:!0},{label:"CALENDAR",icon:"calendar",active:!1},{label:"TOP",icon:"star",active:!1},{label:"OPTIONS",icon:"time",active:!1}],a.selectMenu=function(t){""!=t?e.go(t):e.go("home"),a.navbarVisible=!1},a.selectTab=function(e){for(var t in a.tabs)a.tabs[t].active=t==e},t.tabVisible=!1}e.$inject=["$state","$rootScope"],angular.module("app").controller("MainController",e)}(),function(){"use strict";function e(e){var t=this;t.games=[{title:"GAME1",score:"21"},{title:"GAME2",score:"01"},{title:"GAME3",score:"23"}],e.tabVisible=!1}e.$inject=["$rootScope"],angular.module("app").controller("HomeController",e)}(),function(){"use strict";function e(e){var t=this;t.wefwefwe=[],e.tabVisible=!0}e.$inject=["$rootScope"],angular.module("app").controller("GameEventsController",e)}(),function(){"use strict";function e(e){var t=this;t.aabc="",e.tabVisible=!0}e.$inject=["$rootScope"],angular.module("app").controller("GameDetailsController",e)}(),function(){"use strict";function e(e){var t=this;t.players=[{title:"Player1",name:"Lionel Messi",country:"Argentina",comment:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."},{title:"Player2",name:"Lionel Messi",country:"Argentina",comment:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."},{title:"Player3",name:"Lionel Messi",country:"Argentina",comment:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."}],t.games=[{title:"GAME1",score:"21"},{title:"GAME2",score:"01"},{title:"GAME3",score:"23"}],e.tabVisible=!0}e.$inject=["$rootScope"],angular.module("app").controller("GameController",e)}(),function(){"use strict";function e(e,t){var a=this;a.submenus=[{title:"Schedule",icon:"calendar",url:"playActivity"},{title:"Training",icon:"road",url:"player"},{title:"Scrimmage",icon:"list-alt",url:"stats"},{title:"Matches",icon:"random",url:"match"},{title:"Announcements",icon:"bullhorn",url:"game"},{title:"Leaderboard",icon:"th-list",url:""}],a.selectSubMenu=function(t){""!=t?e.go(t):e.go("dashboard"),a.navbarVisible=!1},t.tabVisible=!0}e.$inject=["$state","$rootScope"],angular.module("app").controller("DashboardController",e)}(),function(){"use strict";function e(){}angular.module("app").run(e)}(),function(){"use strict";function e(e,t){e.state("home",{url:"/",templateUrl:"app/views/home.html",controller:"HomeController",controllerAs:"vm"}).state("dashboard",{url:"/dashboard",templateUrl:"app/views/dashboard.html",controller:"DashboardController",controllerAs:"vm"}).state("playActivity",{url:"/play_activity",templateUrl:"app/views/play-activity.html",controller:"PlayActivityController",controllerAs:"vm"}).state("player",{url:"/player",templateUrl:"app/views/player.html",controller:"PlayerController",controllerAs:"vm"}).state("stats",{url:"/stats",templateUrl:"app/views/stats.html",controller:"StatsController",controllerAs:"vm"}).state("match",{url:"/match",templateUrl:"app/views/match.html",controller:"MatchController",controllerAs:"vm"}).state("game",{url:"/game",templateUrl:"app/views/game.html",controller:"GameController",controllerAs:"vm"}).state("matchLineup",{url:"/match_lineup",templateUrl:"app/views/match-lineup.html",controller:"MatchLineupController",controllerAs:"vm"}).state("gameDetails",{url:"/game_details",templateUrl:"app/views/game-details.html",controller:"GameDetailsController",controllerAs:"vm"}).state("SelectLineup",{url:"/select_lineup",templateUrl:"app/views/select-lineup.html",controller:"SelectLineupController",controllerAs:"vm"}).state("scorecard",{url:"/scorecard",templateUrl:"app/views/scorecard.html",controller:"ScorecardController",controllerAs:"vm"}).state("gameEvents",{url:"/game_events",templateUrl:"app/views/game-events.html",controller:"GameEventsController",controllerAs:"vm"}),t.otherwise("/")}e.$inject=["$stateProvider","$urlRouterProvider"],angular.module("app").config(e)}(),function(){"use strict";angular.module("app").constant("malarkey",malarkey).constant("moment",moment)}(),function(){"use strict";function e(e,t){e.debugEnabled(!0),t.allowHtml=!0,t.timeOut=3e3,t.positionClass="toast-top-right",t.preventDuplicates=!0,t.progressBar=!0}e.$inject=["$logProvider","toastrConfig"],angular.module("app").config(e)}(),angular.module("app").run(["$templateCache",function(e){e.put("app/views/dashboard.html",'<div class="container-fluid dashboard-container"><div class=row><div class=col-xs-1></div><div class=col-xs-10><div class=container-fluid><div class="row margin-top-10"><div class="col-xs-6 padding-0" ng-repeat="submenu in vm.submenus track by $index"><div class=sub-menu-item ng-click=vm.selectSubMenu(submenu.url)><div class=sub-menu-icon><span class="glyphicon glyphicon-{{submenu.icon}}"></span></div><div class=sub-menu-title>{{submenu.title}}</div></div></div></div></div></div><div class=col-xs-1></div></div></div>'),e.put("app/views/game-details.html",'<div class="container-fluid game-details-container"><div class=row>Game Details</div></div>'),e.put("app/views/game-events.html",'<div class="container-fluid game-events-container"><div class=row>Game Events</div></div>'),e.put("app/views/game.html",'<div class="container-fluid game-container"><!--<div class="players-wrapper margin-top-10">--><div class=row><div class="col-xs-11 col-xs-offset-1 left-decoration"><div class=white-circle></div><h4 class="text-white text-bold text-condensed text-uppercase">GAME TODAY-22 JUN</h4><div class="col-xs-3 padding-0"><img class=team-image ng-src=./assets/images/temp/team1.png></div><div class="col-xs-1 padding-0 text-center text-white">VS</div><div class="col-xs-3 padding-0"><img class=team-image ng-src=./assets/images/temp/team2.png></div><div class="col-xs-5 game-info"><h5>Team1 - Team2</h5><h5>Maracana Stadium</h5><h5>5:00 PM</h5></div></div></div><div class=row ng-repeat="player in vm.players"><div class="col-xs-11 col-xs-offset-1 left-decoration"><div class=white-circle></div><h4 class="text-white text-bold text-condensed text-uppercase">{{player.title}}</h4><div class="col-xs-3 padding-0 margin-top-10"><img class=img-responsive ng-src=./assets/images/temp/player.jpg></div><div class="col-xs-9 text-white"><h5>{{player.name}}</h5><h5>{{player.country}}</h5><h5>{{player.comment}}</h5></div></div></div><!--</div>--><div class="row margin-bottom-20"><div class=col-md-12><button class="btn btn-yellow btn-recent-results">RECENT RESULTS</button></div></div><div class="row margin-bottom-20"><div class=col-xs-12><div class=container-fluid><div class=row><div class="col-xs-4 number-pan-wrapper" ng-repeat="game in vm.games"><div class=number-pan><div class="half-width float-left num">{{game.score.split(\'\')[0]}}</div><div class="half-width float-left num">{{game.score.split(\'\')[1]}}</div></div><hr><div class=game-title>{{game.title}}</div></div></div></div></div></div></div>'),e.put("app/views/home.html",'<div class="container-fluid home-container"><div class=row><div class=col-xs-12><h2 class="text-center text-white text-bold text-uppercase text-condensed margin-top-40 margin-bottom-20">dddGame Today - 22 Jun</h2></div></div><div class="row text-center position-relative"><div class=col-xs-6><img class="team-img img-responsive" src=./assets/images/temp/team1.png></div><!--<div class="col-xs-2">VS</div>--><div class=col-xs-6><img class="team-img img-responsive" src=./assets/images/temp/team2.png></div><h2 class=vs-txt>VS</h2></div><div class=row><div class=col-md-12><h3 class="text-center text-bold text-white text-uppercase text-condensed">Team1 - Team2</h3><h3 class="text-center text-bold text-white text-uppercase text-condensed">Maracana Stadium</h3><h3 class="text-center text-bold text-white text-uppercase text-condensed">05:00 PM</h3></div></div><div class=row><div class=col-md-12><button class="btn btn-green btn-start-game">START GAME</button></div></div><div class="row margin-bottom-20"><div class=col-md-12><button class="btn btn-yellow btn-recent-results">RECENT RESULTS</button></div></div><div class="row margin-bottom-20"><div class=col-xs-12><div class=container-fluid><div class=row><div class="col-xs-4 number-pan-wrapper" ng-repeat="game in vm.games"><div class=number-pan><div class="half-width float-left num">{{game.score.split(\'\')[0]}}</div><div class="half-width float-left num">{{game.score.split(\'\')[1]}}</div></div><hr><div class=game-title>{{game.title}}</div></div></div></div></div></div></div>'),e.put("app/views/match-lineup.html",'<div class="container-fluid match-lineup-container"><div class=row><div class=col-xs-12><h2 class="text-center text-white text-bold text-uppercase text-condensed margin-top-40 margin-bottom-20">Game Today - 22 Jun</h2></div></div><div class="row text-center position-relative"><div class=col-xs-6><img class="team-img img-responsive" src=./assets/images/temp/team1.png></div><!--<div class="col-xs-2">VS</div>--><div class=col-xs-6><img class="team-img img-responsive" src=./assets/images/temp/team2.png></div><h2 class=vs-txt>VS</h2></div><div class=row><div class=col-xs-6><h4 class="text-center text-bold text-white text-uppercase text-condensed">Team1</h4></div><div class=col-xs-6><h4 class="text-center text-bold text-white text-uppercase text-condensed">Team2</h4></div><div class=col-xs-12><h5 class="text-center text-bold text-white text-uppercase text-condensed">Maracana Stadium</h5><h5 class="text-center text-bold text-white text-uppercase text-condensed">DATE: OCT 24TH 2017 - STARTING TIME: 2PM</h5></div></div><div class=row><div class=col-md-12><button class="btn btn-green btn-start-game">START GAME</button></div></div><div class="row margin-bottom-20"><div class=col-md-12><button class="btn btn-yellow btn-recent-results">LINE UP</button></div></div><div class="row text-center text-white text-condensed" ng-repeat="p in vm.players track by $index"><div class=col-xs-5><h4 class="text-right text-bold">{{p.team1}}</h4></div><div class="col-xs-2 padding-0"><h4 class="text-center text-bold">{{p.role}}</h4></div><div class=col-xs-5><h4 class="text-left text-bold">{{p.team2}}</h4></div></div><div class=margin-top-20></div></div>'),e.put("app/views/match.html",'<div class="container-fluid match-container"><div class=row><div class="col-xs-12 shadow-effect-bottom"><h4 class="text-white text-condensed text-center text-bold">THIS MONTH MATCHES</h4></div></div><div class=row><div class=col-xs-12><div class=container-fluid><div class="row margin-top-15" ng-repeat="match in vm.matches track by $index"><div class="col-xs-5 padding-0"><div class="team-name float-right text-right">{{match.team1.name}}</div><div class="team-image-wrapper float-left"><img class=team-image ng-src={{match.team1.image}}></div></div><div class="col-xs-2 padding-0 text-center between-div">VS</div><div class="col-xs-5 padding-0"><div class="team-name float-left text-left">{{match.team2.name}}</div><div class="team-image-wrapper float-right"><img class=team-image ng-src={{match.team2.image}}></div></div><div class="col-xs-12 ymd-city">{{match.ymd}} - {{match.city}}</div></div></div></div></div></div>'),e.put("app/views/play-activity.html",'<div class="container-fluid play-activity-container"><div class=row><div class="col-xs-12 activity-title">Arsenal (my team) VS Spirit (away team)</div></div><div class="row padding-left-20 padding-right-20"><div class="col-xs-3 padding-10" ng-repeat="legend in vm.legends track by $index"><div class=play-activity-legends>{{legend.title1}}<br>{{legend.title2}}</div></div></div><div class=row><div class=col-xs-12><table class="table table-responsive table-none-border table-text-center text-white"><thead class=shadow-effect-bottom><tr><th>Time</th><th>#</th><th>Plyr</th><th>Position</th><th></th></tr></thead><tbody><tr ng-repeat="r in [1,1,1,1,1,1] track by $index"><td>00:00</td><td>12</td><td>Player1</td><td>Mid-Fielder</td><td><div class=field-check>On</div></td></tr></tbody></table></div></div></div>'),e.put("app/views/player.html",'<div class="container-fluid player-container"><div class="row margin-top-15"><div class=col-xs-5><img class=img-responsive src=./assets/images/temp/player.jpg></div><div class=col-xs-7><h3>{{vm.player.name}}</h3><img class="col-xs-4 padding-0 img-responsive" src=./assets/images/temp/team1.png><h4>{{vm.player.club}}</h4><h4>{{vm.player.city}}</h4></div><div class="col-xs-12 shadow-effect-bottom"><h4>Age: {{vm.player.age}}</h4><h4>Height: {{vm.player.height}}</h4><h4>Weight: {{vm.player.weight}}</h4></div><div class="col-xs-12 padding-top-20 player-comment">{{vm.player.comment}}</div></div></div>'),e.put("app/views/scorecard.html",'<div class="container-fluid scorecard-container"><div class=row>Scorecard</div></div>'),e.put("app/views/select-lineup.html",'<div class="container-fluid select-lineup-container"><div class=row>Select Line up</div></div>'),e.put("app/views/stats.html",'<div class="container-fluid stats-container"><div class="row padding-10"><div class="col-xs-offset-2 col-xs-4"><button class="btn btn-primary">TEAMS</button></div><div class=col-xs-4><button class="btn btn-warning">PLAYERS</button></div></div><div class=row><div class=col-xs-12><table class="table table-responsive table-none-border table-text-center text-white"><thead><tr><th class=col-xs-8></th><th>PTS</th><th>GW</th><th>GL</th><th>DIF</th></tr></thead><tbody><tr ng-repeat="p in [1,2,3,4,5,6,7,8] track by $index"><td><div class=player-avatar></div><div class=player-name>Player{{p}}</div></td><td><div class=margin-top-10>00</div></td><td><div class=margin-top-10>00</div></td><td><div class=margin-top-10>00</div></td><td><div class=margin-top-10>+0</div></td></tr></tbody></table></div></div></div>')}]);
//# sourceMappingURL=../maps/scripts/app-fa369cfb28.js.map
