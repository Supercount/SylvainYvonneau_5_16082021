fetch("http://localhost:3000/api/furniture").then(function(res) {
    if (res.ok) {
        return res.json();
    }
})