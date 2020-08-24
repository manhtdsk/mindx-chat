import { stopClick } from '../../stopClick.js'
import { createCon } from '../../controller/chat.js'

class ConForm extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(document.getElementById('conversationForm').content.cloneNode(true))

        this.$form = this._shadowRoot.querySelector('form')
        this.$nameInput = this.$form.querySelector("form-input[name='name']")
        this.$memberInput = this.$form.querySelector("form-input[name='member']")

        this.$form.addEventListener('submit', (event) => {
            event.preventDefault()
            const name = this.$nameInput.value
            const member = this.$memberInput.value
            createCon(name, member)
        })
    }
    connectedCallback() {
        stopClick(this._shadowRoot)
    }
}
customElements.define('con-form', ConForm)