$(function() {
  // Init

  // Typical Day
  // <td><div class="day"></div></td>
  //
  // Day not part of this month
  // <td><div class="day notmyday"></div></td>
  //
  // Day with number
  // <td><div class="day"><div class="number">1</div></div></td>
  //
  // Day with event
  // <td><div class="day"><div class="number">1</div><div class="event"></div></div></td>

  $('#previous').click(function() {
    var newmonth = $('#month').find('h1').data('month') - 1;
    var newyear = $('#month').find('h1').data('year');
    if (newmonth < 0) {
      newyear--;
      newmonth = 11;
    }

    date = new Date();
    date.setMonth(newmonth);
    date.setYear(newyear);
    putMonth(date);
  });

  $('#next').click(function() {
    var newmonth = $('#month').find('h1').data('month') + 1;
    var newyear = $('#month').find('h1').data('year');
    if (newmonth > 11) {
      newyear++;
    }

    date = new Date();
    date.setMonth(newmonth);
    date.setYear(newyear);
    putMonth(date);
  });

  var daysInMonth = function(month, year) {
    return new Date(year, month+1, 0).getDate();
  };

  var putMonth = function(date) {
    var today = new Date();
    date.setDate(1);
    var month = date.getMonth();
    var year = date.getFullYear();
    var months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");

    $('#month').find('h1').text(months[month] + ' ' + year).data('month',month).data('year',year);
    var cal = $('#month').find('table').empty();

    var i = 0;
    var number = 1;
    var first = date.getDay();
    var next_month_day = 1;

    var newyear = year;
    var newmonth = month;
    if (newmonth == 0) {
      newyear--;
      newmonth = 11;
    } else {
      newmonth--;
    }
    var last_month_days = daysInMonth(newmonth, newyear);
    var this_month_days = daysInMonth(month, year);

    while (i < 42) {
      var row = $('<tr />');
      for (var j=0; j < 7; j++) {
        if (i < first) {
          row.append('<td><div class="day notmyday"><div class="number">' + ((last_month_days - first) + i) + '</div></div></td>');
        } else if (number > this_month_days) {
          row.append('<td><div class="day notmyday"><div class="number">' + next_month_day + '</div></div></td>');
          next_month_day++;
        } else {
          if (number == today.getDate() && month == today.getMonth() && year == today.getFullYear()) {
            row.append('<td><div class="day" id="today"><div class="number">' + number + '</div></div></td>');
          } else {
            row.append('<td><div class="day"><div class="number">' + number + '</div></div></td>');
          }
          number++;
        }
        i++;
      }
      cal.append(row);
    }
  };

  var getDate = function(year, month, date) {
    var date = new Date(year, month, date);

    return date;
  };

  var init = function() {
    date = new Date();

    putMonth(date);
  };

  init();

});
