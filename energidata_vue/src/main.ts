import {defineCustomElement } from 'vue'
import './style.css'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'

customElements.define('eny-app', defineCustomElement(App))
customElements.define('eny-hello-world', defineCustomElement(HelloWorld))

