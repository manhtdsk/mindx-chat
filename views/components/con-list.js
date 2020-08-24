class ConList extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(document.getElementById('conversationList').content.cloneNode(true))

        this.$btnCreateCon = this._shadowRoot.getElementById('btnCreateCon')
        this.$conList = this._shadowRoot.querySelector('#conList')
    }

    static get observedAttributes() {
        return ['list']
    }
    set list(newvl) {
        this.setAttribute('list', newvl)
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'list') {
            this.$conList.innerHTML = ""
            JSON.parse(newVal).forEach(item => {
                this.addCon(item.name, item.member.length)
            })
        }
    }

    connectedCallback() {
        this.$btnCreateCon.addEventListener('click', (event) => {
            event.stopPropagation()
            const createConEvent = new CustomEvent('create-con');
            this.dispatchEvent(createConEvent);
        })
    }
    //function trong class k caafn twf khoas function
    addCon(name, noOfMems) {
        const conItem = document.createElement('con-item')
        conItem.name = name
        conItem.noOfMems = noOfMems
        this.$conList.appendChild(conItem)
    }


}


customElements.define('con-list', ConList)