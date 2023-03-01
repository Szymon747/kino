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
        {
            document.getElementById("body").innerHTML = ""
            let back = document.createElement("button")
            back.className = "guzik";
            back.innerHTML = "Return"
            self = this
            back.onclick = function () {
                history.back()
            }
            document.getElementById("body").appendChild(back)
        }
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
                    self.goToSite(this.list)
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
                let node = document.createTextNode("Data: " + info[i].date)
                p.appendChild(node)
                div.appendChild(p)
            }
            {
                let p = document.createElement("p")
                let node = document.createTextNode("Godzina: " + info[i].time.slice(0, -3))
                p.appendChild(node)
                div.appendChild(p)
            }
            {
                let p = document.createElement("p")
                let node = document.createTextNode("Sala: " + info[i].screen)
                p.appendChild(node)
                div.appendChild(p)
            }
            document.getElementById("movies").appendChild(div)
        }
    }

    goToSite(reservations) {
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
        for (let i = 0; i < 15; i++) {
            let tr = document.createElement("tr")
            for (let j = 0; j < 20; j++) {
                let td = document.createElement("td")
                td.dataset.row = i + 1
                td.dataset.seat = j + 1
                let taken = reservations.some(x => x.row == i && x.seat == j)
                if (taken) {

                    td.className = "taken"

                }
                else {
                    td.className = "not_taken"
                }
                tr.appendChild(td)
            }
            table.appendChild(tr)
        }
        document.getElementById("body").appendChild(table)
    }

}

let main = new Main