window.onload = function() {
    console.log('Todo listo!')
    prepareOnButton()
    prepareOffButton()
    prepareRandomButton()
    prepareCarouselButton()
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