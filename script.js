const button = document.querySelectorAll('.button')

const body = document.querySelector('body')

const container = document.createElement('div')
container.className = 'container'

const text = document.createElement('div')
text.className = 'text'

let inputFilled = document.createElement('textarea')
inputFilled.className = 'input'
inputFilled.placeholder = "6+7.."

const histoverlay = document.createElement('div')

const his=document.createElement('div')
his.id='hisCont'

const historyContent = document.createElement('div')
histoverlay.className = 'history'
his.appendChild(historyContent)

const h2=document.createElement('h2')
h2.textContent='HISTORY'
h2.id='heading'

const clearhistorybtn=document.createElement('div')
clearhistorybtn.textContent='clear hisotry'
clearhistorybtn.id='clear'

histoverlay.append(h2,his,clearhistorybtn)

const overlay = document.createElement('div')
overlay.className = 'overlay'
overlay.append(histoverlay)

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '/', '*', '=', 'C', 'del', 'his']
const frag = document.createDocumentFragment()
list.forEach(number => {
    const n = document.createElement('button')
    n.className = 'button'
    n.textContent = number
    frag.appendChild(n)
})

const div = document.createElement('div')
div.className = 'buttonDiv'
div.append(frag)

const anotherDiv = document.createElement('div')
anotherDiv.append(div)

let l = []
container.addEventListener('click', (e) => {
   
    if (e.target.classList.contains('button')) {
        let n = e.target.textContent

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
        } 
        
        else if (n === 'his') { 
                const history = getlocal()
                historyContent.textContent=history.length
                    ? history.join('\n')
                    : 'No history'
                overlay.classList.remove('hidden')
            
        }

        else {
            l.push(n)
            inputFilled.value += n
        }
    }
})

overlay.addEventListener('click', () => {
    overlay.classList.add('hidden')
})


function tokenize(expr) {

    return expr ? expr.match(/\d+|[+\-*/]/g) : []
}

clearhistorybtn.addEventListener('click',()=>{
    clearHistory()
    his.textContent=''
})

function compute(tokens) {
    let stack = []

    for (let i = 0; i < tokens.length; i++) {
        let t = tokens[i]

        if (t === '*' || t === '/') {
            let prev = Number(stack.pop())
            let next = Number(tokens[++i])
            let result=0
            if(t==='*'){
                result=prev*next
            }else{
                if(next===0){
                    alert('invalid number')
                    
                    break
                }else{
                     result=prev/next
                }
               
            }
            // let result = t === '*' ? prev * next : prev / next
            stack.push(result)
        } else {
            stack.push(t)
        }
    }

    // handle + and -
    let result =0
    if(stack[0].includes('-')){
        result=`${( Number(stack[0]))}`
    }
    
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
let i='hist'
function clearHistory() {
    localStorage.removeItem(i)
}

function setlocal(value) {
    const attr = getlocal()
    if (attr[0] === value) {
        return
    }

    attr.unshift(value)
    localStorage.setItem(i, JSON.stringify(attr))
    console.log('history', attr);
    if (value === 'undefined') {

    }

}
function getlocal() {
    const c = localStorage.getItem(i)
    return c ? JSON.parse(c) : []
}


text.append(inputFilled)
overlay.classList.add('hidden')
container.append(text, anotherDiv, overlay)
body.append(container)

