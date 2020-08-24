class ConItem extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(document.getElementById('conversationItem').content.cloneNode(true))
        this.$name = this._shadowRoot.querySelector('#name')
        this.$noOfMems = this._shadowRoot.querySelector('#noOfMems')
    }

    static get observedAttributes() {
        return ['name', 'no-of-mems']
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
}
customElements.define('con-item', ConItem)