export default class Header {
    createHeader() {
        const header = document.createElement('header');
        return header
    }

    createH1(text) {
        const h1 = document.createElement('h1');
        h1.innerText = text
    }

    createAudioDropdown() {
        let dropDownContainer = this.createDropDownContainer();
        let dropDownContent = document.createElement('div');
        dropDownContent.setAttribute('id', 'myDropdown');
        dropDownContent.classList.add('dropdown-content');
        let soundBtn = this.createDropDownBtn();
        soundBtn.addEventListener('click', () => {
            if (dropDownContent.classList.contains('show')) {
                dropDownContent.classList.remove('show');
            }
            else {
                dropDownContent.classList.add('show');
            }
        })
        

        // volume slider
        let volumeSlider = this.createLabel('volume');
        volumeSlider.innerText = 'Volume';
        let inputVolume = this.createInput('range', 'volume', 'volume', '0.2', '0', '1');
        inputVolume.setAttribute('step', "0.01");

        // game SFX
        let labelSfx = this.createLabel('sfx');
        labelSfx.innerText = 'SFX';
        let inputSfx = this.createInput('checkbox', 'sfx', 'sfx', null);
        inputSfx.checked = true;

        // menu music
        let labelWaves = this.createLabel('waves');
        labelWaves.innerText = 'Waves';
        let inputWaves = this.createInput('checkbox', 'waves', 'waves');
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

        dropDownContent.append(volumeSlider, inputVolume, labelSfx, inputSfx,
            labelWaves, inputWaves)
        dropDownContainer.append(soundBtn, dropDownContent)
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
        btn.innerText = 'Sound Settings';
        btn.classList.add('AudioSettings')
        return btn
    }
}