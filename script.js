$(function () {
  var arrow_size = 120;
  var $arrow = $('.arrow');
  var arrows = {
    t: $arrow.filter('.top'),
    l: $arrow.filter('.left'),
    b: $arrow.filter('.bottom'),
    r: $arrow.filter('.right'),
    l_r: $arrow.filter('.left, .right'),
    t_b: $arrow.filter('.top, .bottom')
  };
  $.extend(true, $arrow, arrows);
  Object.keys(arrows).forEach(function (key) {
    arrows[key].i = arrows[key].find('.icon');
    arrows[key].t = arrows[key].find('.text');
  });
  var $page = $('.page');
  $page.c = $page.filter('.container');
  $page.t = $page.filter('.top');
  $page.l = $page.filter('.left');
  $page.b = $page.filter('.bottom');
  $page.r = $page.filter('.right');

  var current_v = 0, current_h = 0;

  var move = function (v, h) {
    if (v == current_v && h == current_h) {
      v = 0;
      h = 0;
    }
    current_v = v;
    current_h = h;

    $arrow.l_r.css({
      'top': 50 * (1 - v) + '%',
      'margin-top': -arrow_size / 2 * (1 - v) + 'px'
    });
    $arrow.l.css({
      'transform': 'rotate(' + -90 * (1 - 0.5 * v) + 'deg)'
    });
    $arrow.r.css({
      'transform': 'rotate(' + 90 * (1 - 0.5 * v) + 'deg)'
    });
    $arrow.l.t.css({
      'transform': 'rotate(' + 90 * (1 - v) + 'deg)'
    });
    $arrow.r.t.css({
      'transform': 'rotate(' + -90 * (1 - v) + 'deg)'
    });

    $arrow.t_b.css({
      'left': 50 * (1 - h) + '%',
      'margin-left': -arrow_size / 2 * (1 - h) + 'px'
    });
    $arrow.t.css({
      'transform': 'rotate(' + -90 * (0.5 * h) + 'deg)'
    });
    $arrow.b.css({
      'transform': 'rotate(' + 90 * (0.5 * h) + 'deg)'
    });

    var $vp, $vn;
    if (h == 0) {
      if (v != 0) {
        $vp = v < 0 ? $arrow.t : $arrow.b;
        $vn = v > 0 ? $arrow.t : $arrow.b;
        $vp.i.css({
          'transform': 'rotate(' + 90 * v + 'deg)'
        });
        $vn.i.css({
          'transform': 'rotate(' + 90 * v + 'deg)'
        });
        $vp.t.css({
          'opacity': 0
        });
        $vn.t.css({
          'opacity': 1
        });
      }
      $arrow.l.i.css({
        'transform': 'rotate(90deg)'
      });
      $arrow.r.i.css({
        'transform': 'rotate(90deg)'
      });
      $arrow.l.t.css({
        'opacity': 1
      });
      $arrow.r.t.css({
        'opacity': 1
      });
    }
    if (v == 0) {
      if (h != 0) {
        $arrow.l.i.css({
          'transform': 'rotate(' + 90 * h + 'deg)'
        });
        $arrow.r.i.css({
          'transform': 'rotate(' + -90 * h + 'deg)'
        });
      }
      $arrow.l.t.css({
        'transform': 'rotate(0deg)',
        'opacity': h < 0 ? 0 : 1
      });
      $arrow.r.t.css({
        'transform': 'rotate(0deg)',
        'opacity': h > 0 ? 0 : 1
      });
      $arrow.t.i.css({
        'transform': 'rotate(90deg)'
      });
      $arrow.b.i.css({
        'transform': 'rotate(-90deg)'
      });
      $arrow.t.t.css({
        'opacity': 1
      });
      $arrow.b.t.css({
        'opacity': 1
      });
    }

    $page.c.css({
      'top': -50 * v + '%',
      'left': -50 * h + '%'
    });
    $page.t.css({
      'top': -100 * (1 + v) + '%',
      'margin-top': v < 0 ? 0 : arrow_size
    });
    $page.l.css({
      'left': -100 * (1 + h) + '%',
      'margin-left': h < 0 ? 0 : arrow_size
    });
    $page.b.css({
      'bottom': -100 * (1 - v) + '%',
      'margin-bottom': v > 0 ? 0 : arrow_size
    });
    $page.r.css({
      'right': -100 * (1 - h) + '%',
      'margin-right': h > 0 ? 0 : arrow_size
    });
  };

  $arrow.t.click(function () {
    move(-1, 0);
  });
  $arrow.b.click(function () {
    move(+1, 0);
  });
  $arrow.l.click(function () {
    move(0, -1);
  });
  $arrow.r.click(function () {
    move(0, +1);
  });
});