const widthScroll = window.innerWidth - document.body.offsetWidth;
window.disabledScroll = function () {
    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText =`
    position: relative;
    overflow: hidden;
    height:100vh;
    `;
};

window.enabledScroll = function () {
    document.body.style.cssText = `position: relative;`; 
    window.scroll({top: document.body.dbScrollY});
};