class ConList extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(document.getElementById('conversationList').content.cloneNode(true))

        this.$btnCreateCon = this._shadowRoot.getElementById('btnCreateCon')
        this.$conList = this._shadowRoot.querySelector('#conList')
    }

    static get observedAttributes() {
        return ['list','active-id']
    }
    set activeId(newvl) {
        this.setAttribute('activeId', newvl)
    }
    set list(newvl) {
        this.setAttribute('list', newvl)
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if(name=="active-id"){
            if(oldVal==newVal) return;
            this._shadowRoot.querySelector("#"+oldVal).active='';
            this._shadowRoot.querySelector("#"+newVal).active=true;

        }

        if (name === 'list') {
            this.$conList.innerHTML = ""
            JSON.parse(newVal).forEach(item => {
                console.log(item)
                this.addCon(item.name, item.member.length, item.id)
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
    addCon(name, noOfMems,id) {
        const conItem = document.createElement('con-item')
        conItem.name = name
        conItem.noOfMems = noOfMems
        conItem.id=id
        this.$conList.appendChild(conItem)
    }


}


customElements.define('con-list', ConList)