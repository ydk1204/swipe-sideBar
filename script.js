let startX, startY, endX, endY;
const leftSidebar = document.getElementById('left-sidebar');
const rightSidebar = document.getElementById('right-sidebar');
const mainContent = document.getElementById('main-content');
const body = document.body;

function createOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    return overlay;
}

const overlay = createOverlay();

function toggleLeftSidebar() {
    if (body.classList.contains('sidebar-open-right')) {
        body.classList.remove('sidebar-open-right');
        rightSidebar.style.transform = 'translateX(100%)';
    }
    body.classList.toggle('sidebar-open');
    leftSidebar.style.transform = body.classList.contains('sidebar-open') ? 'translateX(0)' : 'translateX(-100%)';
    toggleOverlay();
}

function toggleRightSidebar() {
    if (body.classList.contains('sidebar-open')) {
        body.classList.remove('sidebar-open');
        leftSidebar.style.transform = 'translateX(-100%)';
    }
    body.classList.toggle('sidebar-open-right');
    rightSidebar.style.transform = body.classList.contains('sidebar-open-right') ? 'translateX(0)' : 'translateX(100%)';
    toggleOverlay();
}

function toggleOverlay() {
    if (body.classList.contains('sidebar-open') || body.classList.contains('sidebar-open-right')) {
        overlay.style.opacity = '1';
        overlay.style.visibility = 'visible';
    } else {
        overlay.style.opacity = '0';
        overlay.style.visibility = 'hidden';
    }
}

function handleTouchStart(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
}

function handleTouchMove(event) {
    if (!startX || !startY) {
        return;
    }

    endX = event.touches[0].clientX;
    endY = event.touches[0].clientY;

    const diffX = startX - endX;
    const diffY = startY - endY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        event.preventDefault();
    }
}

function handleTouchEnd() {
    if (!startX || !startY || !endX || !endY) {
        return;
    }

    const diffX = startX - endX;
    const diffY = startY - endY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) {
            // 왼쪽으로 스와이프
            if (body.classList.contains('sidebar-open')) {
                toggleLeftSidebar(); // 왼쪽 사이드바 닫기
            } else if (!body.classList.contains('sidebar-open-right')) {
                toggleRightSidebar(); // 오른쪽 사이드바 열기
            }
        } else if (diffX < -50) {
            // 오른쪽으로 스와이프
            if (body.classList.contains('sidebar-open-right')) {
                toggleRightSidebar(); // 오른쪽 사이드바 닫기
            } else if (!body.classList.contains('sidebar-open')) {
                toggleLeftSidebar(); // 왼쪽 사이드바 열기
            }
        }
    }

    startX = startY = endX = endY = null;
}

function handleMouseDown(event) {
    startX = event.clientX;
    startY = event.clientY;
}

function handleMouseMove(event) {
    if (!startX || !startY) {
        return;
    }

    endX = event.clientX;
    endY = event.clientY;
}

function handleMouseUp() {
    handleTouchEnd();
}

document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd, false);

document.addEventListener('mousedown', handleMouseDown, false);
document.addEventListener('mousemove', handleMouseMove, false);
document.addEventListener('mouseup', handleMouseUp, false);

overlay.addEventListener('click', () => {
    if (body.classList.contains('sidebar-open')) {
        toggleLeftSidebar();
    }
    if (body.classList.contains('sidebar-open-right')) {
        toggleRightSidebar();
    }
});