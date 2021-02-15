$(function () {
  var $t = $('.top');
  var $l = $('.left');
  var $b = $('.bottom');
  var $r = $('.right');
  var $l_r = $('.left, .right');
  var $t_b = $('.top, .bottom');
  [$t, $l, $b, $r, $l_r, $t_b].forEach(function (o) {
    o.i = o.find('.icon');
    o.t = o.find('.text');
  });

  var move = function (v, h) {
    $l_r.css({
      'top': 50 * (1 - v) + '%',
      'margin-top': -60 * (1 - v) + 'px'
    });
    $l.css({
      'transform': 'rotate(' + -90 * (1 - 0.5 * v) + 'deg)'
    });
    $r.css({
      'transform': 'rotate(' + 90 * (1 - 0.5 * v) + 'deg)'
    });
    $l.t.css({
      'transform': 'rotate(' + 90 * (1 - v) + 'deg)'
    });
    $r.t.css({
      'transform': 'rotate(' + -90 * (1 - v) + 'deg)'
    });

    $t_b.css({
      'left': 50 * (1 - h) + '%',
      'margin-left': -60 * (1 - h) + 'px'
    });
    $t.css({
      'transform': 'rotate(' + -90 * (0.5 * h) + 'deg)'
    });
    $b.css({
      'transform': 'rotate(' + 90 * (0.5 * h) + 'deg)'
    });

    var $vp, $vn;
    if (h == 0) {
      $vp = v < 0 ? $t : $b;
      $vn = v > 0 ? $t : $b;
      $vp.i.css({
        'transform': 'rotate(' + 90 * v + 'deg)'
      });
      $vp.t.css({
        'opacity': 0
      });
      $vn.i.css({
        'transform': 'rotate(' + 90 * v + 'deg)'
      });
      $vn.t.css({
        'opacity': 1
      });
      $l.t.css({
        'opacity': 1
      });
      $r.t.css({
        'opacity': 1
      });
      $l.i.css({
        'transform': 'rotate(90deg)'
      });
      $r.i.css({
        'transform': 'rotate(90deg)'
      });
    }
    if (v == 0) {
      $l.i.css({
        'transform': 'rotate(' + 90 * h + 'deg)'
      });
      $l.t.css({
        'transform': 'rotate(0deg)',
        'opacity': h < 0 ? 0 : 1
      });
      $r.i.css({
        'transform': 'rotate(' + -90 * h + 'deg)'
      });
      $r.t.css({
        'transform': 'rotate(0deg)',
        'opacity': h > 0 ? 0 : 1
      });
      $t.t.css({
        'opacity': 1
      });
      $b.t.css({
        'opacity': 1
      });
      $t.i.css({
        'transform': 'rotate(90deg)'
      });
      $b.i.css({
        'transform': 'rotate(-90deg)'
      });
    }
  };

  $t.click(function () {
    move(-1, 0);
  });
  $b.click(function () {
    move(+1, 0);
  });
  $l.click(function () {
    move(0, -1);
  });
  $r.click(function () {
    move(0, +1);
  });
});