import { createH1, createDiv, createInput, createLabel } from "./util";
import Weather from "./weatherChange";

export default class Header {
    createHeader() {
        const header = document.createElement('header');
        return header
    }

    createSettingsDropdown() {
        let dropDownContainer = this.createDropDownContainer();
        let dropDownContent = document.createElement('div');
        dropDownContent.setAttribute('id', 'myDropdown');
        dropDownContent.classList.add('dropdown-content');

        let settingsBtn = this.createDropDownBtn();
        settingsBtn.addEventListener('click', () => {
            if (dropDownContent.classList.contains('show')) {
                dropDownContent.classList.remove('show');
            }
            else {
                dropDownContent.classList.add('show');
            }
        })

        let weatherSettings = new Weather()

        dropDownContent.append(this.soundSettings(), weatherSettings.createWeatherOptions())
        dropDownContainer.append(settingsBtn, dropDownContent)
        return dropDownContainer
        
    }

    createLabel(labelPurpose) {
        const label = document.createElement('label');
        label.setAttribute('for', `${labelPurpose}`)
        return label
    }

    createInput(type, id, name, value, min = null, max = null) {
        const input = document.createElement('input');
        input.setAttribute("type", `${type}`)
        input.setAttribute("id", `${id}`)
        input.setAttribute("name", `${name}`)
        input.setAttribute("value", `${value}`)
        if (min !== null && max !== null) {
        input.setAttribute("min", `${min}`)
        input.setAttribute("max", `${max}`)
        }
        return input
    }

    createDropDownContainer() {
        const dropDown = document.createElement('div');
        dropDown.classList.add('dropdown')
        return dropDown
    }

    createDropDownBtn() {
        const btn = document.createElement('button');
        btn.innerText = 'Settings';
        btn.classList.add('Settings')
        return btn
    }

    volumeSlider() {
        // volume slider
        let volumeContainer = document.createElement('div');
        volumeContainer.classList.add('VolumeContainer');
        let volumeSlider = createLabel('volume');
        volumeSlider.innerText = 'Volume';
        let inputVolume = createInput('range', 'volume', 'volume', '0.2', '0', '1');
        inputVolume.setAttribute('step', "0.01");

        volumeContainer.append(volumeSlider, inputVolume)

        return volumeContainer
    }

    soundSettings() {
        let toggleContainer = document.createElement('div');
        toggleContainer.classList.add('toggleContainer');        

        const sfx = this.SFXInput()
        const waves = this.wavesInput()
        toggleContainer.append(sfx, waves);

        let soundSettings = document.createElement('div');
        soundSettings.classList.add('soundSettings');
        soundSettings.innerHTML = `<b>Sound Settings</b>`;
        soundSettings.append(this.volumeSlider(), toggleContainer)
        return soundSettings
    }

    SFXInput() {
         // game SFX
         let labelSfx = createLabel('sfx');
         labelSfx.innerText = 'SFX';
         let inputSfx = createInput('checkbox', 'sfx', 'sfx', null);
         inputSfx.checked = true;

         let sfxContainer = createDiv('sfx');
         sfxContainer.append(labelSfx, inputSfx)
         return sfxContainer
    }

    wavesInput() {
        let labelWaves = createLabel('waves');
        labelWaves.innerText = 'Waves';
        let inputWaves = createInput('checkbox', 'waves', 'waves');
        inputWaves.checked = true;

        inputWaves.addEventListener('input', () => {
            let waves = document.querySelector('#menuMusic');
            let volumeSlider = document.querySelector('#volume')
            if (!waves.getAttribute('prevVolume')) {
                waves.setAttribute('prevVolume', waves.volume)
            }
            let prevVolume = waves.getAttribute('prevVolume');
            if (waves.volume == 0) {
                waves.volume = prevVolume;
                volumeSlider.value = prevVolume;
            }
            else {
                waves.volume = 0;
                volumeSlider.value = 0;
            }
        })

        const wavesContainer = createDiv('waves');
        wavesContainer.append(labelWaves, inputWaves)

        return wavesContainer
    }

    playAndPauseButtons() {}
}