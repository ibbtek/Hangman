<template>
  <div>
    <nav class="nav">
      <div class="nav-left">
        <a style="cursor: default;">{{ $t('messages.score') }}: {{ score }}</a>
        <a style="cursor: default;">{{ $t('messages.topScore') }}: {{ topScore }}</a>
      </div>
      <div class="nav-center">
        <h1 style="cursor: default;" class="text-primary">Hangman</h1>
      </div>
      <div class="nav-right">
        <a style="cursor: pointer;" :class="{'active': $i18n.locale === 'fr' }" @click="locale('fr')">FR</a>
        <a style="cursor: pointer;" :class="{'active': $i18n.locale === 'en' }" @click="locale('en')">EN</a>
      </div>
    </nav>
    <div>
      <br>
        <keyboard
          @key:enter="initialize"
          @key:letter="searchForCharacterInWord"/>
    </div>

    <div>
      <h3 v-if="info == ''">{{ $t('messages.lives') + ': ' + live }}</h3>
      <h3 v-else v-html="info"></h3>
      <h3>{{ output }}</h3>
      <p>
        <canvas id="canvas" class="bg-light bd-dark" width="200" height="150"/>
      </p>
      <p>
        <button
          class="bg-primary text-white"
          @click="initialize()">
          {{ $t('messages.tryAgain') }}
        </button>
      </p>
    </div>
    <footer class="is-center">
      <small>&copy; {{ getCurrentYear }}
        <a target="_blank" href="https://ibbtek.github.io/">
          Ibbtek
        </a>
      </small>
    </footer>
  </div>
</template>
<style>
input {
  margin: 5px;
}
</style>
<script>
import Keyboard from './Keyboard.vue'
import Store from 'electron-store'
import englishList from '../lists/en.js'
import frenchList from '../lists/fr.js'

const store = new Store()

export default {
  name: 'Hangman',
  components: {
    Keyboard
  },
  data () {
    return {
        live: 10,
        answerArray: [],
        guessArray: [],
        info: '',
        output: '',
        score: 0,
        topScore: 0
    }
  },
  computed: {
    getCurrentYear () {
      return new Date().getFullYear()
    },
    input () {
      return document.querySelectorAll('input[type=button]')
    },
    canvas () {
      return document.querySelector('#canvas')
    }
  },
  watch: {
    score (newValue) {
      if (newValue > store.get('topScore')) {
        this.topScore = newValue
        store.set('topScore', newValue)
      }
    }
  },
  mounted () {
    if (!store.has('topScore')) {
      store.set('topScore', 0)
    }
    this.topScore = store.get('topScore')
    this.initialize()
  },
  methods: {
    locale (locale) {
      this.$i18n.locale = locale
      this.initialize()
    },
    getRandomWord() {
      let word = ''
      if (this.$i18n.locale == 'fr') {
        word = frenchList[Math.floor(Math.random() * frenchList.length)]
      } else {
        word = englishList[Math.floor(Math.random() * englishList.length)]
      }
      return word.split('')
    },
    disableBtn (state) {
      for (var i = 0; i < this.input.length; i++) {
        this.input[i].disabled = state
      }
    },
    drawHangman () {
      let ctx = this.canvas.getContext('2d')
      ctx.lineWidth = 3
      switch (this.live) {
        case 10:
          ctx.beginPath()
          ctx.clearRect(0, 0, 200, 150)
          break
        case 9:
          ctx.moveTo(110,140)
          ctx.lineTo(190,140)
          ctx.stroke()
          break
        case 8:
          ctx.moveTo(150,140)
          ctx.lineTo(150,20)
          ctx.stroke()
          break
        case 7:
          ctx.moveTo(150,20)
          ctx.lineTo(60,20)
          ctx.stroke()
          
          ctx.moveTo(150,50)
          ctx.lineTo(120,20)
          ctx.stroke()
          break
        case 6:
          ctx.moveTo(60,20)
          ctx.lineTo(60,40)
          ctx.stroke()
          break
        case 5:
          ctx.beginPath()
          ctx.arc(60,50,10,0,2*Math.PI)
          ctx.stroke()
          break
        case 4:
          ctx.moveTo(60,60)
          ctx.lineTo(60,100)
          ctx.stroke()
          break
        case 3:
          ctx.moveTo(60,80)
          ctx.lineTo(80,65)
          ctx.stroke()
          break
        case 2:
          ctx.moveTo(60,80)
          ctx.lineTo(40,65)
          ctx.stroke()
          break
        case 1:
          ctx.moveTo(60,100)
          ctx.lineTo(80,125)
          ctx.stroke()
          break
        case 0:
          ctx.moveTo(60,100)
          ctx.lineTo(40,125)
          ctx.stroke()
          break
        default:
          break
      }
    },
    searchForCharacterInWord (event) {
      let btn = event.currentTarget
      btn.disabled = true
			if (this.guessArray.indexOf('_ ') > -1 && this.live > 0) {
				let foundChar = false
				let chr =btn.value
				for (var i = 0; i < this.answerArray.length; i++) {
					if (this.answerArray[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '') === chr) {
						foundChar = true
						this.guessArray[i] = chr + ' '
					}
				}
				if (!foundChar) {
					this.live--
					this.drawHangman()
				}
				if (this.guessArray.indexOf('_ ') > -1) {
					if ( this.live > 0) {
						this.output = this.guessArray.toString().replace(/,/g, '')
					} else {
						this.info = "<strong class='text-white bg-error'>" + this.$t('messages.lost')+ "</strong>"
						this.output = this.answerArray.toString().replace(/,/g, '')
            this.disableBtn(true)
					}
				} else {
          this.score++
					this.info = "<strong class='text-white bg-success'>" + this.$t('messages.won') + "</strong>"
					this.output = this.guessArray.toString().replace(/ /g, '').replace(/,/g, '')
          this.disableBtn(true)
				}
			}
    },
    initialize () {
      this.live = 10
      this.guessArray = []
      this.info = ''
			this.answerArray = this.getRandomWord()
			for (var i = 0; i < this.answerArray.length; i++) {
				if (this.answerArray[i] === this.answerArray[0] || this.answerArray[i] === this.answerArray[this.answerArray.length - 1]) {
					this.guessArray[i] = this.answerArray[i] + ' '
				} else {
					this.guessArray[i] = '_ '
				}
			}
			this.disableBtn(false)
			this.drawHangman()
			this.output = this.guessArray.toString().replace(/,/g, '')
		}
  }
}
</script>
