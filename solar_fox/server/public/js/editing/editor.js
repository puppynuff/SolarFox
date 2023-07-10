// This file made me redo how I handled the lines ID, and how the terminal loads them.
Terminal.clearLines();

const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

main();

async function main() {
    let file_data = await (await fetch("/get_file?file=" + urlParams.get("file"))).text();

    if(file_data == "Non-Existant") return window.location = "/";


    document.title = `Solar Fox - ${urlParams.get("file").split("/")[urlParams.get("file").split("/").length -1]}`;

    console.log(file_data);

    let file_data_array = file_data.split("\n");

    for(let i = 0; i < file_data_array.length; i++) {
        file_data_array[i] = file_data_array[i].replaceAll("&", "&amp");
        file_data_array[i] = file_data_array[i].replaceAll("<", "&lt");
        file_data_array[i] = file_data_array[i].replaceAll("<", "&gt");
        new Line(`${file_data_array[i]}`, {
            type: "pre"
        });
    }
}