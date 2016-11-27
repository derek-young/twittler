$(document).ready(function(){
  var $tweets = $('.tweets');
  $tweets.html('<dl></dl>');
  var printed = 0;
  var filtered = false;
  var userClicked = '';

  printTweets();

  function printTweets() {
    var stop = printed;

    for(var index = stop; index < streams.home.length; index++) {
      var tweet = streams.home[index];

      if(!filtered || (tweet.user === userClicked)) {
        var $tweet = $('<dt></dt>');
        var $description = $('<dd>' + formatDate(tweet.created_at) + '</dd>');
        $tweet.html('<a class="user" href="#" data-username="' + tweet.user
          + '">@' + tweet.user + '</a>: ' + tweet.message);
        $description.prependTo($tweets.children('dl'));
        $tweet.prependTo($tweets.children('dl'));
        $tweet.on('click', '.user', userClick);
        printed++;
      }
    }
    setTimeout(printTweets, 5000);
  }

  function userClick(event) {
    event.preventDefault();
    if(!filtered) {
      filtered = true;
      userClicked = $(this).data('username');
      $('.tweets').find('dt').filter(function() {
        return $(this).find('a').data('username') !== userClicked;
      }).addClass('hidden');
      $('.tweets').find('dd').filter(function() {
        return $(this).prev().find('a').data('username') !== userClicked;
      }).addClass('hidden');
    }
    else {
      $('.tweets').find('dt').removeClass('hidden');
      $('.tweets').find('dd').removeClass('hidden');
    }
  }
});

function formatDate(date) {
  var months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var month = months[date.getMonth()];
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var zone = date.toString().match(/\(([A-Za-z\s].*)\)/)[1];

  if(minutes < 10) minutes = "0" + String(minutes);

  return month + " " + day +  ", " + year + " @ " + hours + ":" + minutes + " "  + zone;
}
