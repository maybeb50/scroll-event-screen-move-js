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
