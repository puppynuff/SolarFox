// This file made me redo how I handled the lines ID, and how the terminal loads them.
Terminal.clearLines();

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

main();

/**
 *  Loads and highlights the code in the terminal. Working on being able to edit the code.
 * 
 * @returns { void }
 */
async function main() {
    let file_data = await (await fetch("/file_handling/get_file?file=" + urlParams.get("file"))).text();

    if(file_data == "Non-Existant") return window.location = "/";

    // file_data = file_data.replaceAll("<", "&lt");

    file_data = await highlight(file_data, urlParams.get("file").slice(-2));

    document.title = `Solar Fox - ${urlParams.get("file").split("/")[urlParams.get("file").split("/").length -1]}`;

    let file_data_array = file_data.split("\n");

    for(let i = 0; i < file_data_array.length; i++) {
        new Line(file_data_array[i], {
            type: "pre"
        });
    }
}