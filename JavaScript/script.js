let pTags = document.getElementsByTagName("p");
let pTagsByClass = document.getElementsByClassName("demo-p");

console.log(pTags);

let currentDate = new Date();

let dateString = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

for (let pTag of pTags) {
    console.log(pTag);
    pTag.innerHTML = `<a href="#"> Today Date</a> : ${dateString}`;
}
