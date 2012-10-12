$(function() {
  var months = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
  var days = new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
  var db = {};

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
  //
  // Object Keys
  // db.year.month.day

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

  $('#go-today').click(function() {
    date = new Date();
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

    $('#month').find('h1').text(months[month] + ' ' + year).data('month',month).data('year',year);
    var cal = $('#month').find('table').empty();

    var i = 0;
    var number = 1;
    var theFirst = date.getDay();
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
        if (i < theFirst) {
          row.append('<td><div class="day notmyday previous"><div class="number">' + ((last_month_days - theFirst) + (i+1)) + '</div></div></td>');
        } else if (number > this_month_days) {
          row.append('<td><div class="day notmyday next"><div class="number">' + next_month_day + '</div></div></td>');
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
    // Set Date
    date = new Date();
    putMonth(date);
  };

  $('#dialog').dialog({
    autoOpen: false,
    closeText: 'x',
    minHeight: 300,
    modal: true,
    position: 'center',
    hide: {effect: 'fade', duration: 500},
    show: {effect: 'fade', duration: 750},
  });

  $('#add-event-dialog').dialog({
    autoOpen: false,
    closeText: 'x',
    minHeight: 100,
    modal: true,
    position: 'center',
    hide: {effect: 'fade', duration: 500},
    show: {effect: 'fade', duration: 750},
    title: 'Add event',
  });

  $('.day').live('click', function() {
    var $dialog = $('#dialog');

    var num = $(this).find('.number').text();
    var newmonth = $('#month').find('h1').data('month');
    var newyear = $('#month').find('h1').data('year');
    var date = new Date();
    if ($(this).hasClass('notmyday')) {
      if ($(this).hasClass('next')) {
        newmonth++;
      } else {
        newmonth--;
      }
    }
    date.setMonth(newmonth);
    date.setYear(newyear);
    date.setDate(num);
    var day = date.getDay();
    var title = days[day] + ' ' + months[newmonth] + ' ' + num + ', ' + newyear;
    var key = '' + newyear + months[newmonth] + num;

    $dialog.data('key', key);

    $dialog.dialog('option', 'title', title);

    $dialog.dialog('open');
  });

    /* For dynamic sizing when resizing the window
  $(window).resize(function(event) {
    var width = event.target.innerWidth;
    console.log(width);
    $('.day').css('width', (width)*(.1));
    $('.day').css('height', (width)*(.1));
    $('.day').css('border-radius', (width)*(.01));
  });
    */

  $('#add-event').click(function() {
    var $dialog = $('#add-event-dialog');
    $dialog.dialog('open');
  });

  $('#save-event').click(function() {
    var task = $('#event-text').val();
    $('#event-text').val('');
    var key = $('#dialog').data('key');
    if (db[key] == undefined) {
      db[key] = [task];
    } else {
      db[key].push(task);
    }
    $('#add-event-dialog').parent().find('.ui-dialog-titlebar-close').click();
    console.log(db);
  });

  init();

});
