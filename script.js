$(function () {
  var $body = $('body');
  var resize = function () {
    $body.css('height', window.innerHeight);
  };
  $(window).resize(resize);
  resize();

  $('a').attr('target', '_blank');

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

  var $square = $('.square');

  var current_v = 0, current_h = 0;

  var move = function (v, h, anim) {
    var duration = anim ? 500 : 0;
    current_v = v;
    current_h = h;

    $arrow.l_r.animate({
      'top': 50 * (1 - v) + '%',
      'margin-top': -arrow_size / 2 * (1 - v) + 'px'
    }, duration);
    $arrow.l.animateRotate(-90 * (1 - 0.5 * v), duration);
    $arrow.r.animateRotate(90 * (1 - 0.5 * v), duration);

    if (v < 0) {
      $arrow.l.t.animateRotate(-180 * v, duration);
      $arrow.r.t.animateRotate(180 * v, duration);
    } else {
      $arrow.l.t.animateRotate(0, duration);
      $arrow.r.t.animateRotate(0, duration);
    }

    $arrow.t_b.animate({
      'left': 50 * (1 - h) + '%',
      'margin-left': -arrow_size / 2 * (1 - h) + 'px'
    }, duration);
    $arrow.t.animateRotate(-90 * (0.5 * h), duration);
    $arrow.b.animateRotate(90 * (0.5 * h), duration);

    $arrow.t.i.animateRotate(90 * (v < 0 ? 1 + 2 * v : 1), duration);
    $arrow.b.i.animateRotate(90 * (v > 0 ? -1 - 2 * v : -1), duration);
    $arrow.t.t.animate({
      'opacity': v < 0 ? 1 + v : 1
    }, duration);
    $arrow.b.t.animate({
      'opacity': v > 0 ? 1 - v : 1
    }, duration);

    $arrow.l.i.animateRotate(90 * (h < 0 ? 1 + 2 * h : 1), duration);
    $arrow.r.i.animateRotate(90 * (h > 0 ? 1 - 2 * h : 1), duration);
    $arrow.l.t.animate({
      'opacity': h < 0 ? 1 + h : 1
    }, duration);
    $arrow.r.t.animate({
      'opacity': h > 0 ? 1 - h : 1
    }, duration);
    //}

    $page.c.animate({
      'top': -50 * v + '%',
      'left': -50 * h + '%',
      'opacity': 1 - Math.abs(v) - Math.abs(h)
    }, duration);
    $page.t.animate({
      'top': -100 * (1 + v) + '%',
      'left': -100 * h + '%',
      'margin-top': (4 / 3) * (0.25 + v) * arrow_size
    }, duration);
    $page.l.animate({
      'left': -100 * (1 + h) + '%',
      'top': -100 * v + '%',
      'margin-left': (4 / 3) * (0.25 + h) * arrow_size
    }, duration);
    $page.b.animate({
      'bottom': -100 * (1 - v) + '%',
      'left': -100 * h + '%',
      'margin-bottom': (4 / 3) * (0.25 - v) * arrow_size
    }, duration);
    $page.r.animate({
      'right': -100 * (1 - h) + '%',
      'top': -100 * v + '%',
      'margin-right': (4 / 3) * (0.25 - h) * arrow_size
    }, duration);
  };

  var orig_v = 0, orig_h = 0;
  var click = function (v, h) {
    if (orig_v == v && orig_h == h) v = h = 0;
    move(v + offset_v, h + offset_h, true);
    orig_v = v;
    orig_h = h;
  };
  $arrow.t.click(function () {
    click(-1, 0);
  });
  $arrow.b.click(function () {
    click(+1, 0);
  });
  $arrow.l.click(function () {
    click(0, -1);
  });
  $arrow.r.click(function () {
    click(0, +1);
  });

  var offset_h = 0, offset_v = 0;
  var control = function (ratio_v, ratio_h) {
    offset_v = ratio_v / 10;
    offset_h = ratio_h / 10;
    move(orig_v + offset_v, orig_h + offset_h);
    $square.css({
      'transform': 'rotateX(' + -ratio_v * 45 + 'deg) rotateY(' + ratio_h * 45 + 'deg)'
    });
  };

  var listener = function (e) {
    var x = e.pageX;
    var y = e.pageY;
    var w = $body.width();
    var h = $body.height();
    var ratio_v = y / h - 0.5;
    var ratio_h = x / w - 0.5;
    control(ratio_v, ratio_h);
  };

  if (document.documentMode || /Edge/.test(navigator.userAgent)) {
    $('.i-hate-ie').css('display', 'block');
    return;
  }

  $body.mousemove(listener);
  $body.on('touchmove', function (event) {
    listener(event.originalEvent.touches[0]);
    return false;
  });
});

$.fn.animateRotate = function (angle, duration) {
  if (duration == 0) this.rotate(angle);
  else this.rotate({animateTo: angle, duration: duration});
};