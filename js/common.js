(function($) {
    
    var _nowScene = 1;
    var _minScene = 1;
    var _maxScene = 4;
    var _actionFlag = false;

    $(document).ready(function() {
        clearIntervalEvent = function() {
            clearTimeout(clearIntervalEvent);
        };

        init();
    });

    function clearSceneClass() {
        for(var i = 1; i <= _maxScene; i++) {        
            $('#promotion').removeClass('scene'+i);
        }
    }
    
    function setScene(num) {
        // Up 0, Down 2 
        console.log('num', num);

        if(true === _actionFlag) return; 
        if(num < _minScene) return;
        if(num > _maxScene) return;
        if(num === _nowScene) return;

        _actionFlag = true;
        delay = 10;

        $('.content-box').each(function(index) {
            // 0,1,2,3
            $(this).delay(delay).animate({
                top: (index - num) + 1 + '00%'
            }, 500, 'easeInOutCubic', function() {
                _actionFlag = false;
                clearIntervalEvent();
            });
        });

        clearSceneClass();

        $('.content-box').removeClass('off');
        $('.content-box').eq(_nowScene - 1).addClass('off');
        $('#promotion').addClass('scene'+ num);

        /* bullet */
        $('.link-page').removeClass('on');
        $('.link-page').eq(num - 1).addClass('on');

        _nowScene = num;
    }

    function setMove(isUp) {
        (isUp) ? setScene(_nowScene - 1) : setScene(_nowScene + 1);
    }

    function handle(delta) {
        if(Math.abs(delta) < 0.9) return;
        if(true === _actionFlag) return;
        
        if(delta > 0) {
            setMove(true); // MouseUp 1
        } else {
            setMove(false); // MouseDown -1
        }
    }

    function wheel(event) {
        var delta = 0;
        // IE 
        if(!event) event = window.event; 
        if(event.wheelDelta) {
            // IE, Opera : UP 120, Down -120
            delta = event.wheelDelta / 120; 
        } else if(event.detail) {
            // Moz : Up -3, Down 3
            delta = -event.wheelDelta / 3;
        };
        if(delta) handle(delta);
    }

    function touchEventInit() {
        var touchStart;
        var touchEnd;
        var content = document.getElementById('content');

        content.addEventListener('touchstart', function(event) {
            touchStart = event.touches[0].clientY;
            console.log('touchStart', touchStart);
        })

        content.addEventListener('touchend', function(event) {
            touchEnd = event.changedTouches[0].clientY;
            console.log('touchEnd', touchEnd);
            if(touchStart > touchEnd+5) {
                setMove(false);
            } else {
                setMove(true);
            };
        })
    }
    
    function init() {
        if(window.addEventListener) {
            window.addEventListener('DOMMouseScroll', wheel, false); // for moz
            window.onmousewheel = function(event) {
                document.onmousewheel = wheel; // IE, Opera
            }
        };

        // Mobile Touch event
        touchEventInit();

        $('.link-page').each(function(index) {
            $(this).on('click', function(e) { 
                setScene(index + 1); // 1, 2, 3, 4
                return false;
            })
        });
    }

})(jQuery);