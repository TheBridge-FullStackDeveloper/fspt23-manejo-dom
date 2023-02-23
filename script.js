window.onload = function() {
    console.log('Todo listo!')
    prepareOnButton()
    prepareOffButton()
    prepareRandomButton()
    prepareCarouselButton()
    // New code!
    addNewButton()
}

const bulb = {
    state: false,
    item: document.querySelector('.bulb'),
    intervalId: -1,
    on: function() {
        // this.item === document.querySelector('.bulb')
        this.item.classList.replace('light-off', 'light-on')
        document.querySelector('.on').disabled = true
        document.querySelector('.off').disabled = false
    },
    off: function() {
        this.item.classList.replace('light-on', 'light-off')
        document.querySelector('.off').disabled = true
        document.querySelector('.on').disabled = false
    },
    random: function() {
        return Math.floor(Math.random() * 255)
    },
    randomColor: function() {
        return `rgb(${this.random()}, ${this.random()}, ${this.random()})`
    },
    setColor: function() {
        this.item.style.backgroundColor = this.randomColor()
    },
    carousel: function() {
        this.intervalId = setInterval(function() {
            this.setColor()
        }.bind(this), 2000)
        const carouselButton = document.querySelector('.carousel')
        carouselButton.innerText = 'Running'
    },
    stopCarousel: function() {
        clearInterval(this.intervalId)
        this.intervalId = -1
        const carouselButton = document.querySelector('.carousel')
        carouselButton.innerText = 'Carousel'
    }
}

function prepareOffButton() {
    const offButton = document.querySelector('.off')
    offButton.addEventListener('click', function() {
        bulb.off()
    })
}

function prepareOnButton() {
    const onButton = document.querySelector('.on')
    onButton.addEventListener('click', function() {
        bulb.on()
    })
}

function prepareRandomButton() {
    const randomButton = document.querySelector('.random')
    randomButton.addEventListener('click', function() {
        bulb.setColor()
    })
}

function prepareCarouselButton() {
    const carouselButton = document.querySelector('.carousel')
    carouselButton.addEventListener('click', function() {
        if(bulb.intervalId > -1) {
            bulb.stopCarousel()
        } else {
            bulb.carousel()
        }
    })
}

// New code!

const lamps = []

function addNewButton() {
    const button = document.createElement('button')
    button.innerText = 'Add bulb!'

    button.addEventListener('click', addNewLamp) // Esto es igual que: function() { addNewLamp() }

    const buttonsContainer = document.querySelector('.buttons')
    buttonsContainer.appendChild(button)
}

function addNewLamp() {
    const lamp = document.createElement('section')
    lamp.classList.add('lamp')

    const bulbId = `bulb-${lamps.length}`
    const bulb = document.createElement('div')
    bulb.classList.add('bulb', 'light-off')
    bulb.setAttribute('id', bulbId)

    const button = document.createElement('button')
    button.innerText = 'On'
    
    button.addEventListener('click', function() {
        const bulb = document.querySelector(`#${bulbId}`)

        if(this.innerText === 'On') {
            bulb.classList.replace('light-off', 'light-on')
            this.innerText = 'Off'
        } else {
            bulb.classList.replace('light-on', 'light-off')
            button.innerText = 'On'
        }
    })

    lamp.appendChild(bulb)
    lamp.appendChild(button)

    const bulbsContainer = document.querySelector('.bulbs-container')
    bulbsContainer.appendChild(lamp)

    lamps.push(lamp)
}