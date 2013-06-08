(function () {
    "use strict";

    window.onStart = function () {
        window.sf.scene.show("Main");
        window.sf.scene.focus("Main");
    };

    window.onDestroy = function () {
        window.webapis.recognition.UnsubscribeExEvent(deviceapis.recognition.PL_RECOGNITION_TYPE_VOICE, "svgApp");
    };
}());