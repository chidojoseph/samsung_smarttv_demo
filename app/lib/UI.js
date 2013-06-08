(function () {
    "use strict";

    window.UI = {
        raphaelInstance : null,
        createButton : function (x, y, title, clickHandler) {
            var button;

            this.raphaelInstance.setStart();

            this.raphaelInstance.rect(x, y, 200, 40, 20).attr(
                {
                    fill : "90-#e5d09b:0-#efcd63:50-#f0be22:50-#f9dc24:100",
                    "fill-opacity" : 1,
                    "stroke-width" : 0
                }
            ).glow(
                {
                    width : 1,
                    fill : true,
                    opacity : 1,
                    offsetx : 0,
                    offsety : 1,
                    color : "#ccc"
                }
            );

            this.raphaelInstance.text(x + 100, y + 20, title).attr(
                {
                    fill : "#fff",
                    "font-size" : 20,
                    "font-weight" : "bold",
                    "font-family" : "Arial, Helvetica, sans-serif"
                }
            );

            button = this.raphaelInstance.setFinish();

            button.click(clickHandler);
        }
    };
}());