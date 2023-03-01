class Main {
    constructor() {
        this.start()
        this.info
        this.miejsca
        this.title
        this.board = []
    }

    start() {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "./connect.php");
        xhttp.onload = () => {
            let data = xhttp.response
            let arr = data
            this.info = JSON.parse(arr)
            this.generateSite()
        }
        xhttp.send();
    }

    generateSite() {
        let info = this.info
        console.log(info)
        document.getElementById("body").innerHTML = ""
        let wyloguj = document.createElement("button")
        wyloguj.className = "guzik";
        wyloguj.innerHTML = "Logout"
        wyloguj.onclick = function () {
            window.location.href = "index.php?logout=1"
        }
        document.getElementById("body").appendChild(wyloguj)

        {
            let div = document.createElement('div')
            div.id = "movies"
            document.getElementById("body").appendChild(div)
        }
        let tab = ["./movies/1.jpg", "./movies/2.jpg", "./movies/3.jpg"]
        for (let i = 0; i < info.length; i++) {
            let div = document.createElement('div')
            div.id = info[i].name
            div.className = "movie"
            self = this
            div.onclick = function () {
                self.id = info[i].id
                var xhttp = new XMLHttpRequest();
                xhttp.open("POST", './reservations.php?movie=' + info[i].id);
                xhttp.onload = () => {
                    let data = xhttp.response
                    let arr = data
                    this.list = JSON.parse(arr)
                    self.goToSite(this.list, self.id)
                }
                xhttp.send();
            }
            let img = document.createElement("img")
            img.src = tab[i]
            console.log(tab[i])
            img.className = "cover"
            div.appendChild(img)
            {
                let p = document.createElement("p")
                let node = document.createTextNode("DATA: " + info[i].date)
                p.appendChild(node)
                div.appendChild(p)
            }
            {
                let p = document.createElement("p")
                let node = document.createTextNode("GODZINA: " + info[i].time.slice(0, -3))
                p.appendChild(node)
                div.appendChild(p)
            }
            document.getElementById("movies").appendChild(div)
        }
    }

    goToSite(reservations, movie_id) {
        console.log(reservations)

        document.getElementById("body").innerHTML = ""
        let back = document.createElement("button")
        back.className = "guzik";
        back.innerHTML = "Return"
        self = this
        back.onclick = function () {
            self.generateSite()
        }
        document.getElementById("body").appendChild(back)
        let table = document.createElement("table")
        table.id = "res_table"
        for (let i = 1; i < 16; i++) {
            let tr = document.createElement("tr")
            for (let j = 1; j < 21; j++) {
                let td = document.createElement("td")
                td.dataset.row = i
                td.dataset.seat = j
                let taken = reservations.some(x => x.row == i && x.seat == j)
                // console.log(taken)
                if (taken) {
                    td.className = "taken"
                }
                else {
                    td.className = "not_taken"
                }
                td.onclick = () => {
                    if (td.className == "not_taken") td.className = "rez"
                    else td.className = "not_taken"
                }
                tr.appendChild(td)
            }
            table.appendChild(tr)
        }
        document.getElementById("body").appendChild(table)
        {
            let btn = document.createElement("button")
            btn.className = "guzik";
            btn.innerHTML = "Reserve"
            self = this
            btn.onclick = function () {
                self.reserve(movie_id)
            }
            document.getElementById("body").appendChild(btn)
        }
    }

    reserve(movie_id) {
        let children = document.getElementById("res_table").childNodes
        let rez = []
        for (let child of children) {
            for (let child2 of child.childNodes) {
                if (child2.className == "rez") rez.push({ row: child2.dataset.row, seat: child2.dataset.seat })
            }
        }

        if (rez.length != 0) {
            rez.forEach((e) => {
                $.ajax({
                    type: "POST",
                    url: "./sendData.php",
                    data: {
                        row: e.row,
                        seat: e.seat,
                        movie: movie_id
                    }
                }, function (response) {
                    console.log(response)
                })
                console.log(`Movie id: ${movie_id}\nRow: ${e.row}\nSeat: ${e.seat}`)
            })
            alert("Twoje miejsca zostały zarezerwowane")
            this.generateSite()
        }
        else {
            alert("Aby złożyć zamówienie, należy wybrać przynajmniej jedno wolne miejsce!")
        }

    }
}

let main = new Main