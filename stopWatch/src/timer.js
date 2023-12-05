let timerID = 0;

class StopWatch {
    constructor(id) {
        this.id = id;

        this.manual;
        this.watch;
        this.laps;
    }

    #timeRecords = {
        lap: 0,
        elapsed: 0
    };

    #timeRunning = false;
    #timeRun = null;

    #timePaused = 0;
    #timElapsed = 0;

    #timePause = 0;
    #timeStart = 0;


    tick() {
        if (!this.#timeRunning) {
            this.#timePause ? this.#timePaused += Date.now() - this.#timePause : this.#timeStart = Date.now();
            this.#timeRunning = true;
            this.#timeRun = setInterval(() => {
                this.#timElapsed += 0.1;
                this.display();         
                //this.store();
            }, 100);
        }
    }

    display() {
        this.watch.textContent = this.format();
    }

    format(s = this.#timElapsed) {
        let floatN = 1,
            base = 60;

        let hours = Math.floor(s / base ** 2),
            minutes = Math.floor(s / base),
            seconds = (s % base).toFixed(floatN);

        return `${hours}:${minutes}:${seconds}`;
    }

    formatLaps(s = this.timRecords.elapsed) {
        let miliS = 1000,
            floatN = 3,
            base = 60;

        s = s / miliS;

        let hours = Math.floor(s / base ** 2),
            minutes = Math.floor(s / base),
            seconds = (s % base).toFixed(floatN);

        return (
            hours && minutes ? `${hours} h ${minutes} m ${seconds} s` :
                minutes ? `${minutes} m ${seconds} s` :
                    `${seconds} s`
        );
    }

    pause() {
        if (this.#timeRunning === true) {
            clearInterval(this.#timeRun);
            this.#timePause = Date.now();
            this.#timeRunning = false;            
            //this.store();
        }
    }

    lap() {
        if (this.#timeRunning === true) {
            this.#timeRecords.elapsed = Date.now() - this.#timeStart - this.#timePaused;
            this.#timeRecords.lap++;
        }
    }

    addLap(l = this.#timeRecords) {
        let tr = document.createElement('tr');
        tr.innerHTML = `<td>#${l.lap} lap: </td> 
                        <td>${this.formatLaps(l.elapsed)}</td>
                        <td><button>del</button ></td > `;
        this.laps.append(tr);
        tr.querySelector('button').addEventListener('click', (e) => {
            e.target.parentNode.parentNode.remove();
        })
    }

    reset() {
        clearInterval(this.#timeRun);
        this.#timeRunning = false;
        this.#timeRun = null;
        this.watch;

        this.#timePaused = 0;
        this.#timElapsed = 0;

        this.#timePause = 0;
        this.#timeStart = 0;

        this.#timeRecords = {
            lap: 0,
            elapsed: 0
        };
        //this.store();
    }

    render() {
        let timer = document.createElement('section');
        timer.setAttribute('class', `container ${this.id}`);
        timer.innerHTML = `<div class="display">
                                <h2 id="time">0:0:0.0</h2>
                            </div >
                                <hr>
                            <div id="manual">
                                <button id="start">start</button>
                                <button id="pause" class="hide">pause</button>
                                <button id="lap" class="hide">lap</button>
                                <button id="reset" class="hide">reset</button>
                            </div>
                            <div id="records">
                                 <table id="laps"></table>
                             </div>`;
        main.append(timer);
        this.watch = timer.querySelector("#time");
        this.laps = timer.querySelector("#laps");   
        this.manual = timer.querySelector("#manual");
        this.display();
    }

    activateButtons() {
        let start = this.manual.querySelector('#start'),
            pause = this.manual.querySelector('#pause'),
            reset = this.manual.querySelector('#reset'),
            lap = this.manual.querySelector('#lap');

        start.onclick = () => {
            this.tick();
            [lap, reset, pause].forEach(e => toggleHide(e, start));
        }

        pause.onclick = () => {
            this.pause();
            [lap, pause].forEach(e => toggleHide(start, e));
        }

        lap.onclick = () => {
            this.lap();
            this.addLap();
        }

        reset.onclick = () => {
            this.reset();
            while (this.laps.lastChild) {
                this.laps.lastChild.remove();
            }
            this.watch.textContent = this.format();
            [lap, reset, pause].forEach(e => toggleHide(start, e));
        }

    }

    store() {
        localStorage.setItem(`${this.id}`, []);
        localStorage.setItem(`${this.id}`, [this.#timeRunning,
                                            this.#timePaused,
                                            this.#timElapsed,
                                            this.#timePause,
                                            this.#timeStart
        ]);
    }

    loadTimer(k, e) {
        this.#timeRunning = JSON.parse(e[0]);
        this.#timePaused = e[1];
        this.#timElapsed = e[2];
        this.#timePause = e[3];
        this.#timeStart = e[4];
        if (this.#timeRunning) {
            this.#timeRunning = false;
            this.tick();
        }
        if (timerID < k) timerID = k;
    }
}

function toggleHide(elementToShow, elementToHide) {
    elementToShow.classList.remove("hide");
    elementToHide.classList.add("hide");
};

function addTimer() {
    let stopWatch = new StopWatch(++timerID);
    stopWatch.render();
    stopWatch.activateButtons();
    console.log(stopWatch.id);
}
/* storage overwrite prob.
function loadStorage() {
    for (let i = 0; i < localStorage.length; i++) { 
        let key = localStorage.key(i);
        let el = localStorage.getItem(key).split(',');let loaded = new StopWatch(key);
        
        loaded.render();
        loaded.loadTimer(key, el);
        loaded.display();
        loaded.activateButtons();
    }
}

loadStorage();  */

newTimer.addEventListener('click', () => {
    console.log('listener added');
    addTimer();
});
