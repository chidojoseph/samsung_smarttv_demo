(function () {
    "use strict";

    window.SVG = {
        raphaelInstance : null,
        currentElement : null,
        elements : [],
        create : function (shape) {
            var that, element, moveDragFunction, startDragFunction, endDragFunction;

            that = this;

            moveDragFunction = function (differenceBetweenOriginalAndCurrentX, differenceBetweenOriginalAndCurrentY) {
                this.translatedX = this.originalX + differenceBetweenOriginalAndCurrentX;
                this.translatedY = this.originalY + differenceBetweenOriginalAndCurrentY;

                this.applyTransform();
            };

            startDragFunction = function () {
                this.toFront();

                this.attr(
                    {
                        "stroke-dasharray" : "-",
                        opacity : 0.5
                    }
                );

                if (that.currentElement) {
                    that.currentElement.attr(
                        {
                            "stroke-dasharray" : ""
                        }
                    );
                }

                that.currentElement = this;
            };

            endDragFunction = function () {
                this.originalX = this.translatedX;
                this.originalY = this.translatedY;

                this.attr(
                    {
                        opacity : 1
                    }
                );
            };

            if (shape === "rectangle") {
                element = this.raphaelInstance.rect(0, 0, 100, 100, 10);

                element.originalX = 5;
                element.originalY = 5;
            } else if (shape === "circle") {
                element = this.raphaelInstance.circle(0, 0, 50);

                element.originalX = 60;
                element.originalY = 60;
            }

            element.translatedX = element.originalX;
            element.translatedY = element.originalY;
            element.amountOfScale = 1;
            element.degreesOfRotation = 0;

            element.changeColor = function (randomRed, randomGreen, randomBlue) {
                this.attr(
                    {
                        fill : window.Raphael.rgb(randomRed, randomGreen, randomBlue)
                    }
                );
            };

            element.applyTransform = function () {
                this.transform("t" + this.translatedX + "," + this.translatedY + "s" + this.amountOfScale + "r" + this.degreesOfRotation);
            };

            element.scale = function (amountToBeScaled) {
                this.amountOfScale += amountToBeScaled;

                this.applyTransform();
            };

            element.rotate = function (amountToBeRotated) {
                this.degreesOfRotation += amountToBeRotated;

                this.applyTransform();
            };

            element.attr(
                {
                    fill : "red",
                    stroke : "black",
                    "stroke-width" : 5
                }
            ).drag(moveDragFunction, startDragFunction, endDragFunction);

            element.applyTransform();

            this.elements.push(element);
        }
    };
}());