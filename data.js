var test = {
    "hey": "guy",
    "anumber": 243,
    "anobject": {
        "whoa": "nuts",
        "anarray": [
            1,
            2,
            "thr<h1>ee"
        ],
        "more": "stuff"
    },
    "awesome": true,
    "bogus": false,
    "meaning": null,
    "japanese": "明日がある。",
    "link": "http://jsonview.com",
    "notLink": "http://jsonview.com is great"
};
function displayData() {
    document.getElementById("yup").innerHTML = test.notLink;
    console.log(test)
}