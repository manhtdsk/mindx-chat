class ConItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(document.getElementById('conversationItem').content.cloneNode(true))
        this.$name = this._shadowRoot.querySelector('#name')
        this.$noOfMems = this._shadowRoot.querySelector('#noOfMems')
        this.$container = this._shadowRoot.querySelector('#container')
    }

    static get observedAttributes() {
        return ['name', 'no-of-mems', "id", "active"]
    }
    set active(newvl) {
        this.setAttribute('active', newvl)
    }
    get active() {
        return this.getAttribute('active')
    }

    set id(newvl) {
        this.setAttribute('id', newvl)
    }
    get id() {
        return this.getAttribute('id')
    }
    set name(newvl) {
        this.setAttribute('name', newvl)
    }
    get name() {
        return this.getAttribute('name')
    }
    set noOfMems(newvl) {
        this.setAttribute('no-of-mems', newvl)
    }
    get noOfMems() {
        return this.getAttribute('no-of-mems')
    }
    attributeChangedCallback() {
        console.log(this.noOfMems)
        this.$name.innerHTML = this.name
        this.$noOfMems.innerHTML = this.noOfMems
    }
    connectedCallback() {
        this.$container.addEventListener('click', (event) => {
            const changeActiveConEvent = new CustomEvent('changeActiveCon', {
                composed: true,
                detail: {
                    id: this.id
                },
            })
            this.dispatchEvent(changeActiveConEvent)
        })
    }
}
customElements.define('con-item', ConItem)