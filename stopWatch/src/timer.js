const timing = document.querySelector('#time');

class StopWatch {    
    timeRecords = {
        lap: 0,
        elapsed: 0
    };

    timeRunning = false;
    timeRun = null;

    timePaused = 0;
    timElapsed = 0;

    timePause = 0; 
    timeStart = 0;


    tick() {
        if (!this.timeRunning){
            if (this.timePause) {
                this.timePaused += Date.now() - this.timePause;
            } else {
                this.timeStart = Date.now();
            }

            this.timeRun = setInterval(() => {
                this.timElapsed += 0.1; 
                timing.textContent = format()
            }, 100);

            this.timeRunning = true;
        }        
    }

    pause() {
        if (this.timeRunning === true) {
            clearInterval(this.timeRun);     
            this.timePause = Date.now();    
            this.timeRunning = false;
        }
    }

    lap() {
        if (this.timeRunning === true) {            
            this.timeRecords.elapsed  = Date.now() - this.timeStart - this.timePaused;
            this.timeRecords.lap++;
        } 
    }

    reset(){
        clearInterval(this.timeRun);         
        this.timeRunning = false;
        this.timeRun = null;
        
        this.timePaused = 0;
        this.timElapsed = 0;

        this.timePause = 0; 
        this.timeStart = 0;

        this.timeRecords = {
            lap: 0,
            elapsed: 0
        };
    }
}

function formatLaps(s = stopWatch.timRecords.elapsed){
    let miliS = 1000,
        floatN = 3,
        base = 60;

        s = s / miliS;

    let hours = Math.floor(s / base**2),
        minutes = Math.floor(s / base);
        seconds = (s % base).toFixed(floatN);

    return (
        hours && minutes ? `${hours} h ${minutes} m ${seconds} s` : 
                 minutes ? `${minutes} m ${seconds} s` :
                            `${seconds} s`
    );        
}

function format(s = stopWatch.timElapsed){
    let floatN = 1,
        base = 60;

    let hours = Math.floor(s / base**2),
        minutes = Math.floor(s / base),
        seconds = (s % base).toFixed(floatN);

    return `${hours}:${minutes}:${seconds}`;        
}

function clearLap(){
    let table = document.createElement('table');
        table.setAttribute('id', 'laps');   

    laps.replaceWith(table);
}

function addLap(l = stopWatch.timeRecords){
    let tr = document.createElement('tr');
        tr.innerHTML = `<td>#${l.lap} lap: </td> 
                        <td>${formatLaps(l.elapsed)}</td>`;

    laps.append(tr);
}

function toggleHide(elementToShow, elementToHide) { 
    elementToShow.classList.remove("hide");
    elementToHide.classList.add("hide");
};


let stopWatch = new StopWatch();

start.onclick = function() {
    stopWatch.tick();
    toggleHide(lap, start);
    toggleHide(reset, start);
    toggleHide(pause, start);
}
pause.onclick = function() {
    stopWatch.pause();
    
    toggleHide(start, lap);
    toggleHide(start, pause);
}
lap.onclick = function() {
    stopWatch.lap();
    addLap();
}
reset.onclick = function() {
    clearLap();
    stopWatch.reset();
    timing.textContent = format();

    toggleHide(start, lap);
    toggleHide(start, pause);
    toggleHide(start, reset);
}

