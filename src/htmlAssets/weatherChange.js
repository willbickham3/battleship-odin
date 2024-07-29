import { createH1, createDiv, createInput, createLabel } from "./util";
import staticRain from '../images/staticRain.png'
import rain from '../images/animatedRain.gif'
import sunny from '../images/Sprite-0004.png'
import AudioSetup from "../audio/audioSetup";

export default class Weather {
    createWeatherOptions() {
        const weatherContainer = createDiv('weatherOptions');
        weatherContainer.innerHTML = `<b>Weather Options</b>`
        const stormOptions = this.stormSettings();
        weatherContainer.append(stormOptions);
        return weatherContainer
    }

    stormSettings() {
        const stormContainer = createDiv('stormSettings');

        const stormLabel = createLabel('storm');
        stormLabel.innerText = 'Storm'
        const stormInput = createInput('checkbox', 'storm', 'storm', null)

        const staticStormLabel = createLabel('staticStorm');
        staticStormLabel.innerText = 'Static Storm';
        const staticStormInput = createInput('checkbox', 'staticStorm', 'staticStorm', null);

        stormInput.addEventListener('input', () => {
            const wavesAudio = document.querySelector('#menuMusic');
            const stormAudio = document.querySelector('#stormAudio');
            let volumeSliderValue = document.querySelector('#volume').getAttribute('value');
            console.log(volumeSliderValue)
            const body = document.querySelector('body');

            if (stormInput.checked) {
                if (!staticStormInput.checked) {
                body.style.backgroundImage = `url(${rain})`}
                else {
                    body.style.backgroundImage = `url(${staticRain})`
                }
                wavesAudio.pause()
                stormAudio.play()
                if (stormAudio.getAttribute('prevVolume')) {
                    stormAudio.volume = stormAudio.getAttribute('prevVolume');
                }
                else {
                    stormAudio.volume = 0.2;
                }
            
            }
            else {
                stormAudio.pause()
                wavesAudio.play()
                if (wavesAudio.getAttribute('prevVolume')) {
                    wavesAudio.volume = wavesAudio.getAttribute('prevVolume');
                }
                else {
                    wavesAudio.volume = 0.2;
                }
                body.style.backgroundImage = `url(${sunny})`
            }
        })

        staticStormInput.addEventListener('input', () => {
            const body = document.querySelector('body');
            if (stormInput.checked && staticStormInput.checked) {
                body.style.backgroundImage = `url(${staticRain})`
            }
            else if (stormInput.checked) {
                body.style.backgroundImage = `url(${rain})`
            }
        })

        const animStormContainer = createDiv('stormContainer');
        const staticStormContainer = createDiv('staticStormContainer');
        animStormContainer.append(stormLabel, stormInput)
        staticStormContainer.append(staticStormLabel, staticStormInput)

        stormContainer.append(animStormContainer, staticStormContainer)
        return stormContainer
    }  


}