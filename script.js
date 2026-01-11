const button = document.querySelectorAll('.button')

const body = document.querySelector('body')

const container = document.createElement('div')
container.className = 'container'

const text = document.createElement('div')
text.className = 'text'

let inputFilled = document.createElement('textarea')
inputFilled.className = 'input'
inputFilled.placeholder = "6+7.."

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '/', '*', '=', 'C', 'del', 'his', 'c']
const frag = document.createDocumentFragment()
list.forEach(number => {
    const n = document.createElement('button')
    n.className = 'button'
    n.textContent = number
    frag.appendChild(n)
})
const div = document.createElement('div')
div.appendChild(frag)

let l = []
container.addEventListener('click', (e) => {
    // console.log(e.target);

    if (e.target.classList.contains('button')) {
        n = e.target.textContent
        if (n === 'C') {
            l.length = 0
            inputFilled.value = ''

        }

        else if (n == '=') {
            const s = calculate()
            inputFilled.value = s
            l = [String(s)]
        }
        else if (n === 'del') {
            l.pop()
            inputFilled.value = l.join('')

        } else if (n === 'his') {
            const history = getlocal()
            console.log(typeof history);

            alert(history.length ? history.join('\n') : 'No history')
        }
        else if (n === 'c') {
            clearHistory()
        }
        else {
            l.push(n)
            inputFilled.value += n
        }
    }
})



function tokenize(expr) {

    return expr ? expr.match(/\d+|[+\-*/]/g) : []
}

function compute(tokens) {
    let stack = []

    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i]

        if (t === '*' || t === '/') {
            let prev = Number(stack.pop())
            let next = Number(tokens[++i])
            let result = t === '*' ? prev * next : prev / next
            stack.push(result)
        } else {
            stack.push(t)
        }
    }

    // handle + and -
    let result = Number(stack[0])
    for (let i = 1; i < stack.length; i += 2) {
        let op = stack[i]
        let num = Number(stack[i + 1])

        result = op === '+' ? result + num : result - num
    }

    return result
}

function calculate() {
    const expr = l.join('')
    const tokens = tokenize(expr)
    let dataresult = compute(tokens)
    setlocal(expr + "=" + dataresult)
    return dataresult


}

function clearHistory() {
    localStorage.removeItem(i)
}

function setlocal(value) {
    const attr = getlocal()
    if (attr[0] === value) {
        return
    }

    attr.unshift(value)
    localStorage.setItem('hist', JSON.stringify(attr))
    console.log('history', attr);
    if (value === 'undefined') {

    }

}
function getlocal() {
    const c = localStorage.getItem(i)
    return c ? JSON.parse(c) : []
}


text.append(inputFilled)
container.append(text, div)
body.append(container)


