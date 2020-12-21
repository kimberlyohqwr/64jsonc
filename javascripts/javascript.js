$(document).ready(function() {
    var z_index = 0;
    var relocate = function(row, col, xh, xw, mh, mw) {
        var $fake_cell = $('.fake-row:eq(' + row + ') .fake-col:eq(' + col + ')');
        var offset = $fake_cell.offset();
        var cell = '.cell' + (row + 1) + '' + (col + 1);
        var animating = false;
        $(cell).css({
            'width': $fake_cell.width(),
            'height': $fake_cell.height(),
            'top': offset.top,
            'left': offset.left
        });
        $(cell + ' .fixed').css({
            'width': $fake_cell.width(),
            'height': $fake_cell.height(),
        });
        $(cell + ' > div').css('display', xh > 1 ? 'table-row' : 'table-cell');
        $(cell).hover(function() {
            //            if(animating) return;
            $(this).css('z-index', ++z_index);
            $(this).animate({
                'width': $fake_cell.width() * xw,
                'height': $fake_cell.height() * xh,
                'margin-left': $fake_cell.height() * mw,
                'margin-top': $fake_cell.height() * mh
            });
        }, function() {
            //            if(animating) return;
            animating = true;
            $(this).animate({
                'width': $fake_cell.width(),
                'height': $fake_cell.height(),
                'margin-left': 0,
                'margin-top': 0
            }, function() {
                animating = false;
            });
        });
    };
    var onResize = function() {
        var width = $(window).width();
        var height = $(window).height();
        var min = (width < height ? width : height) - 16;
        $('.fake-grid').css({
            'width': min,
            'height': min,
            'top': (height - min) / 2,
            'left': (width - min) / 2
        });

        relocate(0, 0, 1, 2);
        relocate(0, 1);
        relocate(0, 2, 2, 1);
        relocate(1, 0);
        relocate(1, 1, 3, 1, -1);
        relocate(1, 2);
        relocate(2, 0, 2, 1, -1);
        relocate(2, 1);
        relocate(2, 2, 2, 1, -1);
    };
    onResize();
    $(window).resize(onResize);
});