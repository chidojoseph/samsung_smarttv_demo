(function () {
    "use strict";

    window.SceneMain = function () {
        this.mainHelpbar = {
            helpbarType : "HELPBAR_TYPE_VOICE_CUSTOMIZE",
            bKeepCurrentInfo : "false",
            helpbarItemsList : [
                {
                    itemText : "Create rectangle",
                    commandList : [
                        {
                            command : "rectangle"
                        }
                    ]
                },
                {
                    itemText : "Create circle",
                    commandList : [
                        {
                            command : "circle"
                        }
                    ]
                },
                {
                    itemText : "Change color",
                    commandList : [
                        {
                            command : "color"
                        }
                    ]
                },
                {
                    itemText : "Make smaller",
                    commandList : [
                        {
                            command : "smaller"
                        }
                    ]
                },
                {
                    itemText : "Make bigger",
                    commandList : [
                        {
                            command : "bigger"
                        }
                    ]
                },
                {
                    itemText : "Rotate",
                    commandList : [
                        {
                            command : "rotate"
                        }
                    ]
                }
            ]
        };

        this.mainKeyhelp = {
            "RED" : "Hide voice helpbar",
            "GREEN" : "Show voice helpbar",
            "MOVE" : "Navigate",
            "RETURN" : "Return"
        };

        this.states = {
            MAIN : 0,
            PREVIEW : 1,
            DESCRIBE : 2
        };

        this.state = this.states.MAIN;
    };

    window.SceneMain.prototype = {
        initialize : function () {
            var that, raphaelInstance;

            that = this;
            raphaelInstance = window.Raphael("holder", window.innerWidth, window.innerHeight);

            window.SVG.raphaelInstance = raphaelInstance;
            window.UI.raphaelInstance = raphaelInstance;

            window.UI.createButton(20, 20, "Create rectangle", function () {
                window.events.createRectangle();
            });

            window.UI.createButton(20, 80, "Create circle", function () {
                window.events.createCircle();
            });

            window.UI.createButton(240, 20, "Change color", function () {
                window.events.changeColor();
            });

            window.UI.createButton(460, 20, "Make smaller", function () {
                window.events.makeSmaller();
            });

            window.UI.createButton(460, 80, "Make bigger", function () {
                window.events.makeBigger();
            });

            window.UI.createButton(460, 140, "Rotate", function () {
                window.events.rotate();
            });

            if (window.webapis.recognition.IsRecognitionSupported()) {
                window.webapis.recognition.SubscribeExEvent(
                    window.webapis.recognition.PL_RECOGNITION_TYPE_VOICE,
                    "svgApp",
                    function (event) {
                        that.handleRecognitionEvent.call(that, event);
                    }
                );
            } else {
                alert("ERROR: Gesture recognition not supported");
            }
        },
        handleShow : function () {
            alert("SceneMain.handleShow()");
            this.updateKeyHelp();
        },

        handleHide : function () {
            alert("SceneMain.handleHide()");
        },

        handleFocus : function () {
            alert("SceneMain.handleFocus()");
        },

        handleBlur : function () {
            alert("SceneMain.handleBlur()");
        },
        handleKeyDown : function (keyCode) {
            alert("SceneMain.handleKeyDown(" + keyCode + ")");
        },
        handleRecognitionEvent : function (event) {
            switch (event.eventtype) {
            case "EVENT_VOICE_BEGIN_MONITOR":
            case "EVENT_VOICE_BTSOUND_START":
                this.updateKeyHelp();
                break;
            case "EVENT_VOICE_RECOG_RESULT":
                switch (this.state) {
                case this.states.MAIN:
                    this.handleMainCommand(event.result);
                    break;
                }
                break;
            }
        },
        updateKeyHelp : function () {
            var keyHelp, voiceHelp;

            switch (this.state) {
            case this.states.MAIN:
                keyHelp = this.mainKeyhelp;
                voiceHelp = this.mainHelpbar;
                break;
            }

            window.$("#keyhelp").sfKeyHelp(keyHelp);

            window.webapis.recognition.SetVoiceHelpbarInfo(JSON.stringify(voiceHelp));
        },
        handleMainCommand : function (command) {
            switch (command.toLowerCase()) {
            case "rectangle":
                window.events.createRectangle();
                break;
            case "circle":
                window.events.createCircle();
                break;
            case "color":
                window.events.changeColor();
                break;
            case "smaller":
                window.events.makeSmaller();
                break;
            case "bigger":
                window.events.makeBigger();
                break;
            case "rotate":
                window.events.rotate();
                break;
            }
        }
    };
}());