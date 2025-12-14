export function setupDragScroll() {
    let scrollInterval= null;
    const scrollSpeed= 10;
    const edgeSize= 100;

    function startAutoScroll(direction){
        if (scrollInterval) return;

        scrollInterval= setInterval(()=>{
            if (direction==='up') {
                window.scrollBy(0, -scrollSpeed);
            } else if (direction === 'down') {
                window.scrollBy(0,scrollSpeed);
            }
        }, 16);
    }
    function stopAutoScroll() {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval=null;
        }
    }
    function handleDragMove(e) {
        const y= e.clientY;
        const windowHeight = window.innerHeight;

        if (y<edgeSize) {
            startAutoScroll('up');
        }
        else if (y > windowHeight - edgeSize) {
            startAutoScroll('down');
        }
        else {
            stopAutoScroll();
        }
    }

    return{
        handleDragMove,
        stopAutoScroll
    };
}