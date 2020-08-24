class ChatScreen extends HTMLElement {
    constructor() {
        super()
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(document.getElementById('chatScreen').content.cloneNode(true))

        this.$btnShowCon = this._shadowRoot.querySelector('#btnShowCon')
        this.$btnShowMem = this._shadowRoot.querySelector('#btnShowMem')
        this.$placeHolder = this._shadowRoot.querySelector('#placeholder')

        this.$btnShowCon.addEventListener('click', () => {
            this.$placeHolder.classList.add('visble')
            this.showListCon();
        })

        this.$placeHolder.addEventListener('click', () => {
            this.$placeHolder.classList.remove('visble')
        })
        this.conList=[]
    }
    showListCon() {
        const $conList = document.createElement('con-list')
        $conList.list=JSON.stringify(this.conList)
        $conList.addEventListener('create-con', () => {
            console.log('hello')
            this.showCreateConForm()
        })
        this.$placeHolder.appendChild($conList)
    }

    showCreateConForm() {
        this.$placeHolder.innerHTML = ""
        const $conForm = document.createElement('con-form')
        this.$placeHolder.appendChild($conForm)
    }
    connectedCallback() {
        db.collection("conversations").onSnapshot((querySnapshot) => {
            const list=[]
            querySnapshot.forEach((doc) => {
                this.conList.push(doc.data())
            });
            
        });
    }

}

customElements.define('chat-screen', ChatScreen)