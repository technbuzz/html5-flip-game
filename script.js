// @ts-check
const container = document.querySelector('.container')

function generateParent(items){
    items.forEach(item => {
        const el = document.createElement('div')
        el.dataset.value = item
        container.appendChild(el);
    })
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    generateParent(array)
}

const puzzleItems = [1, 2, 3, 4, 1, 2, 3, 4];
shuffle(puzzleItems)


/** @type {HTMLElement} */
const flipElements = document.querySelectorAll('.container > div')

let activeElements = [];

flipElements.forEach((el, index) => {
    const front = document.createElement('div')
    front.className = 'front'

    const back = document.createElement('div')
    back.className = 'back'
    back.textContent = el.dataset.value

    el.appendChild(front)
    el.appendChild(back)

    el.addEventListener('click', e => {
        const parentEl = e.target.parentElement
        if(e.target.dataset.disabled) {
            // debugger
                return
        }

        if(parentEl.classList.contains('flipped')){
            parentEl.classList.remove('flipped')
        } else {
            activeElementsAudit(parentEl)
            console.log(activeElements)
            // parentEl.classList.add('active')
            // setTimeout(x => {
                //     parentEl.classList.remove('flipped')
                // }, 1500)
            }
            console.log(e.target)
        })
    })
    
    
    function activeElementsAudit(parent) {
        // debugger
        if(activeElements.length === 1) {
            // debugger
            parent.classList.add('flipped')
            activeElements.push(parent)

            if(activeElements[0].textContent === activeElements[1].textContent){
                // alert('Match found')
                parent.addEventListener('transitionend', () => {
                    activeElements.forEach(ae => {
                        ae.innerHTML = ''
                        // debugger
                        ae.dataset.disabled = true
                        
                        // ae.style.visibility = 'hidden'
                        // container.removeChild(ae)
                    })
                });
            }

        } else if(activeElements.length > 1) {
            activeElements.forEach(ae => {
                if(!ae.dataset.disabled) ae.classList.remove('flipped')
            })
            activeElements = []
        } else {
        parent.classList.add('flipped')
        activeElements.push(parent)
    }
}

