(function () {
    "use strict";

    window.events = {
        createRectangle : function () {
            window.SVG.create("rectangle");
        },
        createCircle : function () {
            window.SVG.create("circle");
        },
        changeColor : function () {
            var randomRed, randomGreen, randomBlue;

            randomRed = Math.round(Math.random() * 255);
            randomGreen = Math.round(Math.random() * 255);
            randomBlue = Math.round(Math.random() * 255);

            window.SVG.currentElement.changeColor(randomRed, randomGreen, randomBlue);
        },
        makeSmaller : function () {
            window.SVG.currentElement.scale(-0.1);
        },
        makeBigger : function () {
            window.SVG.currentElement.scale(0.1);
        },
        rotate : function () {
            window.SVG.currentElement.rotate(10);
        }
    };
}());