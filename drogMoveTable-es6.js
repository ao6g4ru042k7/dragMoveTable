function TableDrag(tableContainerString) {
    const pos = {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
        scroll: { x: 0, y: 0 },
    };
    function tableMouseMove(e) {
        pos.end.x = e.clientX;
        pos.end.y = e.clientY;
        this.scrollLeft = pos.scroll.x - pos.end.x + pos.start.x;
        this.scrollTop = pos.scroll.y - pos.end.y + pos.start.y;
    }
    function createStyle() {
        const style = document.createElement("style"),
            head = document.head || document.getElementsByTagName("head")[0];
        const cssText = ".table-container{position:relative}.table-container>.table-wrapper{overflow:scroll}.table-container>.table-wrapper::-webkit-scrollbar{width:.3rem;height:.3rem}.table-container>.table-wrapper::-webkit-scrollbar-track{border-radius:1rem;margin:0}.table-container>.table-wrapper::-webkit-scrollbar-thumb{border-radius:.4rem;background:#dbdbdb}.table-container>.table-wrapper>table{border-collapse:collapse;user-select:none}.table-container>.table-wrapper>table tr:first-child :not(:first-child){position:sticky;top:0}.table-container>.table-wrapper>table tr:not(:first-child)>:first-child{position:sticky;left:0}.table-container>.table-wrapper>table tr:first-child>:first-child{position:absolute;z-index:1}";
        style.type = "text/css";
        style.innerHTML = cssText;
        head.insertBefore(style, null);
    }
    function bindingEvent() {
        const tableContainerArr = [...document.querySelectorAll(tableContainerString)];
        const tableWrapperArr = [...tableContainerArr.map((tableContainer) => tableContainer.querySelector(".table-wrapper"))];
        tableWrapperArr.forEach((tableWrapper) => {
            const moveFun = tableMouseMove.bind(tableWrapper);
            tableWrapper.addEventListener("mousedown", function (e) {
                window.addEventListener("mousemove", moveFun);
                pos.start.x = e.clientX;
                pos.start.y = e.clientY;
                pos.scroll.x = tableWrapper.scrollLeft;
                pos.scroll.y = tableWrapper.scrollTop;
            });
            window.addEventListener("mouseup", function (e) {
                window.removeEventListener("mousemove", moveFun);
            });
        });
    }
    this.init = function () {
        createStyle();
        bindingEvent();
    };
}
