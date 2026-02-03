console.log("Hello");
document.getElementById("message").innerHTML = "Javascript connected!";

function buttonClick() {
    let text = document.getElementById("i_text").value;
    console.log(text);
    document.getElementById("message").innerHTML = text;
}