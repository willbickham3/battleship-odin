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

        let btnContainer = document.createElement('div');
        btnContainer.classList.add('soundBtnContainer');

        playBtn.addEventListener('click', () => {
            this.audioFile.play()
        })
        pauseBtn.addEventListener('click', () => {
            this.audioFile.pause()
        })

        volumeSlider.addEventListener('input', () => {
            let musicFiles = document.querySelectorAll('audio');
            for (const sound of musicFiles) {
                if (!sound.paused) {
                    sound.setAttribute('prevVolume', volumeSlider.value)
                    sound.volume = volumeSlider.value
                }
                else {
                    sound.setAttribute('prevVolume', volumeSlider.value)
                }
            }
            // sound.setAttribute('prevVolume', volumeSlider.value)
            // this.audioFile.volume = volumeSlider.value
        })
        
        btnContainer.append(playBtn, pauseBtn)
        // header.append(playBtn, pauseBtn, volumeSlider)
        // header.append(this.audioFile)
        return btnContainer
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