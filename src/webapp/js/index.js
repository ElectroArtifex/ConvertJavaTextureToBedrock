import fileSaver from "file-saver";
import OfflinePluginRuntime from "offline-plugin/runtime";
import swal from "sweetalert";
import Worker from "./worker";
import "./../css/style.less";

document.addEventListener("DOMContentLoaded", () => {
    const toastMessage = document.getElementById("toastMessage");
    OfflinePluginRuntime.install({
        onInstalled: () => {
            showToastMessage("Ready for install and use offline", 5000, () => {

            });
        },
        onUpdateReady: () => {
            OfflinePluginRuntime.applyUpdate();
        },
        onUpdated: () => {
            showToastMessage("Update installed - Reloading ...", 2000, () => {
                location.reload();
            });
        }
    });

    const selectInputFileButton = document.getElementById("selectInputFileButton");
    selectInputFileButton.addEventListener("change", startConvert);

    const selectInputFolderButton = document.getElementById("selectInputFolderButton");
    if (supportsFolderSelect()) {
        selectInputFolderButton.parentElement.classList.remove("disabled");
        selectInputFolderButton.addEventListener("change", startConvert);
    }

    const experimentalSwitch = document.getElementById("experimentalSwitch");
    experimentalSwitch.checked = localStorage[experimentalSwitch.id];
    experimentalSwitch.addEventListener("change", () => {
        localStorage[experimentalSwitch.id] = experimentalSwitch.checked;
    });

    const main = document.querySelector("main");
    main.addEventListener("dragenter", startConvertDrop);
    main.addEventListener("dragleave", startConvertDrop);
    main.addEventListener("dragover", startConvertDrop);
    main.addEventListener("drop", startConvertDrop);

    let worker = null;

    const logs = document.createElement("ul");
    logs.classList.add("log");

    /**
     * @param {string} message
     * @param {number} duration
     * @param {function} func
     */
    function showToastMessage(message, duration, func) {
        toastMessage.innerText = message;

        toastMessage.dataset.show = "true";

        toastMessage.addEventListener("click", hide);

        setTimeout(hide, duration);

        function hide() {
            toastMessage.removeEventListener("click", hide);

            delete toastMessage.dataset.show;

            func();
        }
    }

    /**
     * @returns {boolean}
     */
    function supportsFolderSelect() {
        return (
            "webkitdirectory" in HTMLInputElement.prototype &&
            "webkitRelativePath" in File.prototype &&
            !(
                navigator.userAgent.match(/Mobile/i) ||
                (navigator.userAgent.match(/Safari/i) && "standalone" in navigator) // iPadOS
            ));
    }

    /**
     * @returns {Promise<>}
     */
    async function startConvert() {
        const files = this.files;

        if (files.length === 0) {
            return;
        }

        logs.innerHTML = "";

        swal({
            title: "Conversion in progress",
            content: logs,
            buttons: {
                save: {
                    text: "Save",
                    className: "swal-button--loading"
                }
            },
            closeOnClickOutside: false,
            closeOnEsc: false
        });
        document.querySelector(".swal-button--loading").disabled = true;

        try {
            if (worker !== null) {
                worker.terminate();
                worker = null;
            }
            worker = new Worker();
            worker.addEventListener("message", afterConvert);
            worker.addEventListener("error", errorConvert);
            worker.postMessage({
                files,
                options: {
                    experimental: experimentalSwitch.checked
                }
            });
        } catch (err) {
            errorConvert(err);
            throw err;
        }
    }

    /**
     * @param {DragEvent} e
     *
     * @returns {Promise<>}
     */
    async function startConvertDrop(e) {
        e.preventDefault();

        this.classList.remove("dragover");

        switch (e.type) {
            case "dragenter":
            case "dragover":
                this.classList.add("dragover");
                break;

            case "drop":
                return startConvert.call(e.dataTransfer);

            default:
                break;
        }
    }

    /**
     * @param {MessageEvent} e
     *
     * @returns {Promise<>}
     */
    async function afterConvert(e) {
        const {log, output} = e.data;

        if (log) {
            _log(log);
            return;
        }

        // Allow select same file again
        selectInputFileButton.value = selectInputFolderButton.value = "";

        const savePopup = swal({
            title: "Conversion was successfully",
            content: logs,
            icon: "success",
            buttons: "Save"
        });

        _log();

        if (await savePopup) {
            if (output instanceof File) {
                fileSaver(output);
            } else {
                // TODO: Bug iOS `File` is undefined in worker?
                fileSaver(output.data, output.name);
            }
        }
    }

    /**
     * @param {ErrorEvent} err
     */
    function errorConvert(err) {
        // Allow select same file again
        selectInputFileButton.value = selectInputFolderButton.value = "";

        swal({
            title: "Conversion was failed",
            content: logs,
            icon: "error"
        });

        _log(`ERROR: ${err.message}`);
    }

    /**
     * @param {string|undefined} log
     */
    function _log(log = undefined) {
        if (log) {
            const li = document.createElement("li");

            li.innerText = log;

            logs.appendChild(li);
        }

        logs.scrollTop = logs.scrollHeight; // Scroll to bottom
    }
});
