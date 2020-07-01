function TableDrag(tableContainerString) {
    var pos = {
        start: {
            x: 0,
            y: 0,
        },
        end: {
            x: 0,
            y: 0,
        },
        scroll: {
            x: 0,
            y: 0,
        },
    };
    var dom;
    function tableMouseMove(e) {
        pos.end.x = e.clientX;
        pos.end.y = e.clientY;
        this.scrollLeft = pos.scroll.x - pos.end.x + pos.start.x;
        this.scrollTop = pos.scroll.y - pos.end.y + pos.start.y;
        for (var i = 0; i < dom.rowArr.length; i++) {
            dom.rowArr[i].style.top = this.scrollTop + "px";
        }
        for (var i = 0; i < dom.columnArr.length; i++) {
            dom.columnArr[i].style.left = this.scrollLeft + "px";
        }
    }
    function getDom() {
        var tableContainerArr = document.querySelectorAll(tableContainerString);
        var tableWrapperArr = [];
        for (var i = 0; i < tableContainerArr.length; i++) {
            tableWrapperArr.push(tableContainerArr[i].querySelector(".table-wrapper"));
        }
        return {
            head: document.head || document.getElementsByTagName("head")[0],
            tableContainerArr: tableContainerArr,
            tableWrapperArr: tableWrapperArr,
            rowArr: document.querySelectorAll(tableContainerString + ">.table-wrapper>table tr:first-child :not(:first-child)"),
            columnArr: document.querySelectorAll(tableContainerString + ">.table-wrapper>table tr:not(:first-child)>:first-child"),
        };
    }
    function createStyle() {
        var style = document.createElement("style");
        var cssText =
            ".table-container{position:relative}.table-container > .table-wrapper{overflow:auto}.table-container > .table-wrapper::-webkit-scrollbar{width:.3rem;height:.3rem}.table-container > .table-wrapper::-webkit-scrollbar-track{border-radius:1rem;margin:0}.table-container > .table-wrapper::-webkit-scrollbar-thumb{border-radius:.4rem;background:#dbdbdb}.table-container > .table-wrapper > table{border-collapse:collapse;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.table-container > .table-wrapper > table tr:first-child :not(:first-child){position:relative}.table-container > .table-wrapper > table tr:not(:first-child) > :first-child{position:relative}.table-container > .table-wrapper > table tr:first-child > :first-child{position:absolute;z-index:1}";
        style.type = "text/css";
        style.innerHTML = cssText;
        dom.head.insertBefore(style, null);
    }

    function bindingEvent() {
        dom.tableWrapperArr.forEach(function (tableWrapper) {
            var moveFun = tableMouseMove.bind(tableWrapper);
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

            tableWrapper.addEventListener("scroll", function (e) {
                for (var i = 0; i < dom.rowArr.length; i++) {
                    dom.rowArr[i].style.top = this.scrollTop + "px";
                }
                for (var i = 0; i < dom.columnArr.length; i++) {
                    dom.columnArr[i].style.left = this.scrollLeft + "px";
                }
            });
        });
    }
    this.init = function () {
        dom = getDom();
        createStyle();
        bindingEvent();
    };
}
