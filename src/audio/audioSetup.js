export default class AudioSetup {
    constructor(audio) {
        this.audioFile = new Audio(audio);
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
    }

    play() {
        this.audioFile.play()
    }

    pause() {
        this.audioFile.pause()
    }

    appendAudio() {
        const playBtn = this.musicButton('play');
        const pauseBtn = this.musicButton('pause');

        const volumeSlider = document.querySelector('#volume');
        volumeSlider.setAttribute("value", "0.20")
        this.audioFile.volume = 0.20;
        playBtn.addEventListener('click', () => {
            this.audioFile.play()
        })
        pauseBtn.addEventListener('click', () => {
            this.audioFile.pause()
        })

        volumeSlider.addEventListener('input', () => {
            this.audioFile.volume = volumeSlider.value
        })

        // header.append(playBtn, pauseBtn, volumeSlider)
        // header.append(this.audioFile)
        return [playBtn, pauseBtn]
    }

    audioContainer() {
        const container = document.createElement('div').classList.add('audio-container');
        return container
    }

    musicButton(className) {
        const btn = document.createElement('button');
        btn.style.width = '35px'
        btn.style.height = '35px'
        btn.classList.add(`${className}`)
        return btn
    }

    volumeSlider() {
    }
}