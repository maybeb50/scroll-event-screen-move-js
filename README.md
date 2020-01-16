## scroll-event-screen-move-js


#### [Mobile] bullet 요소를 클릭 했을 때, document touch 이벤트와 중복 이벤트가 발생 되었을 경우. 
document.addEventListener를 사용할 경우, document에 이벤트를 걸어줌으로 원하는 요소(bullet)를 클릭했을 때 중복 이벤트가 발생된다.
그래서 #content 요소와 .paging-bullet 요소를 마크업에서 분리한 후, document touch 이벤트를 #content 에만 주었다.

#### [Mobile] touch event를 막는 방법?

<pre><code>
function handleCancel(event) {
    event.preventDefalut();

    var touches = event.changedTouches;
    for(var i = 0; i < touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);
        ongoingTouches.splice(idx, 1);  // remove it; we're done
    }
}

document.addEventListener("touchcancel", handleCancel, false);
</code></pre>

#### [jQuery] $(selector).each(), $.each문 차이
$(selector).each()문은 일치하는 객체의 수만큼 반복하는 함수이다.
$.each문은 객체와 배열을 반복하는 반복 함수이다.

<pre><code>
// $(selector).each()문

// $.each문

1. array 
$.each([62, 94], function(index, value){
    console.log(index + ': ' + value);
});

// 0: 62
// 1: 94

2. object
var obj = {'a': 1, 'b': 2};
$.each(obj, function(key, value) {
    console.log(key + ': ' + value);
});

// a: 1
// b: 2
</code></pre>

