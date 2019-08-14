<template>
  <div>
    <nav class="nav">
      <div class="nav-left">
        <a style="cursor: default;">{{ $t('messages.score') }}: {{ score }}</a>
        <a style="cursor: default;">{{ $t('messages.topScore') }}: {{ topScore() }}</a>
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
      <p>
        <input id="a" value="a" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="b" value="b" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="c" value="c" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="d" value="d" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="e" value="e" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="f" value="f" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="g" value="g" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="h" value="h" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="i" value="i" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="j" value="j" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="k" value="k" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="l" value="l" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="m" value="m" type="button" @click="searchForCharacterInWord($event)"/>
      </p>
      <p>
        <input id="n" value="n" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="o" value="o" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="p" value="p" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="q" value="q" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="r" value="r" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="s" value="s" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="t" value="t" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="u" value="u" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="v" value="v" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="w" value="w" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="x" value="x" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="y" value="y" type="button" @click="searchForCharacterInWord($event)"/>
        <input id="z" value="z" type="button" @click="searchForCharacterInWord($event)"/>
      </p>
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
        <a target="_blank" href="http://ibbtek.altervista.org">
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
import Store from 'electron-store'
const store = new Store()

export default {
  name: 'Hangman',
  data () {
    return {
      wordsListEN: ["aclive", "act", "addition", "adjustment", 
        "advertisement", "agreement", "air", "amount", "amusement",
        "animal", "answer", "apparatus", "approval", "argument", "art", 
        "attack", "attempt", "attention", "attraction", "authority",
        "back", "balance", "base", "behaviour", "belief", "birth",
        "bit", "bite", "blood", "blow", "body", "brass", "bread", "breath",
        "brother", "building", "burn", "burst", "business", "butter",
        "canvas", "care", "cause", "chalk", "chance", "change", "cloth",
        "coal", "colour", "comfort", "committee", "company", "comparison",
        "competition", "condition", "connection", "control", "cook",
        "copper", "copy", "cork", "cotton", "cough", "livery", "cover",
        "crack", "credit", "crime", "crush", "cry", "current", "curve",
        "damage", "danger", "daughter", "day", "death", "debt", "decision",
        "degree", "design", "desire", "destruction", "detail",
        "development", "digestion", "direction", "discovery", "discussion",
        "disease", "disgust", "distance", "distribution", "division",
        "doubt", "drink", "driving", "dust", "earth", "edge", "education",
        "effect", "end", "error", "event", "example", "exchange",
        "existence", "expansion", "experience", "expert", "fact", "fall",
        "family", "father", "fear", "feeling", "fiction", "field", "fight",
        "fire", "flame", "flight", "flower", "fold", "food", "force",
        "form", "friend", "front", "fruit", "glass", "gold", "government",
        "grain", "grass", "grip", "group", "growth", "guide", "harbour",
        "harmony", "hate", "hearing", "heat", "help", "history", "hole",
        "hope", "hour", "humour", "ice", "idea", "impulse", "increase",
        "industry", "ink", "insect", "instrument", "insurance", "interest",
        "invention", "iron", "jelly", "join", "journey", "judge", "jump",
        "kick", "kiss", "knowledge", "land", "language", "laugh", "law",
        "lead", "learning", "leather", "letter", "level", "lift", "light",
        "limit", "linen", "liquid", "list", "look", "loss", "love",
        "machine", "man", "manager", "mark", "market", "mass", "meal",
        "measure", "meat", "meeting", "memory", "metal", "middle", "milk",
        "mind", "mine", "minute", "mist", "money", "month", "morning",
        "mother", "motion", "mountain", "move", "music", "name", "nation",
        "need", "news", "night", "noise", "note", "number", "observation",
        "offer", "oil", "operation", "opinion", "order", "organization",
        "ornament", "owner", "page", "pain", "paint", "paper", "part",
        "paste", "payment", "peace", "person", "place", "plant", "play",
        "pleasure", "point", "poison", "polish", "porter", "position",
        "powder", "power", "price", "print", "process", "produce",
        "profit", "property", "prose", "protest", "pull", "punishment",
        "purpose", "push", "quality", "question", "rain", "range", "rate",
        "ray", "reaction", "reading", "reason", "record", "regret",
        "relation", "religion", "representative", "request", "respect",
        "rest", "reward", "rhythm", "rice", "river", "road", "roll",
        "room", "rub", "rule", "run", "salt", "sand", "scale", "science",
        "sea", "seat", "secretary", "selection", "self", "sense",
        "servant", "sex", "shade", "shake", "shame", "shock", "side",
        "sign", "silk", "silver", "sister", "size", "sky", "sleep",
        "slip", "slope", "smash", "smell", "smile", "smoke", "sneeze",
        "snow", "soap", "society", "son", "song", "sort", "sound",
        "soup", "space", "stage", "start", "statement", "steam",
        "steel", "step", "stitch", "stone", "stop", "story", "stretch",
        "structure", "substance", "sugar", "suggestion", "summer",
        "support", "surprise", "swim", "system", "talk", "taste", "tax",
        "teaching", "tendency", "test", "theory", "thing", "thought",
        "thunder", "time", "tin", "top", "touch", "trade", "transport",
        "trick", "trouble", "turn", "twist", "unit", "use", "value",
        "verse", "vessel", "view", "voice", "walk", "war", "wash",
        "waste", "water", "wave", "wax", "way", "weather", "week",
        "weight", "wind", "wine", "winter", "woman", "wood", "wool",
        "word", "work", "wound", "writing", "year"],
        wordsListFR: ["angle", "armoire", "banc", "bureau", "cabinet",
        "carreau", "chaise", "classe", "clé", "coin", "couloir", "dossier",
        "eau", "école", "écriture", "entrée", "escalier", "étagère", "étude",
        "extérieur", "fenêtre", "intérieur", "lavabo", "lecture", "lit", "marche",
        "matelas", "maternelle", "meuble", "mousse", "mur", "peluche", "placard",
        "plafond", "porte", "portemanteau", "poubelle", "radiateur", "rampe",
        "récréation", "rentrée", "rideau", "robinet", "salle", "savon", "serrure",
        "serviette", "siège", "sieste", "silence", "sol", "sommeil", "sonnette",
        "sortie", "table", "tableau", "tabouret", "tapis", "tiroir", "toilette",
        "vitre", "chanter", "chercher", "choisir", "chuchoter", "coller", "colorier",
        "commencer", "comparer", "compter", "construire", "continuer", "copier",
        "couper", "déchirer", "décoller", "décorer", "découper", "demander", "démolir",
        "se dépêcher", "dessiner", "dire", "discuter", "écouter", "écrire", "effacer",
        "entendre", "entourer", "envoyer", "faire", "finir", "fouiller", "goûter",
        "imiter", "laisser", "lire", "mettre", "montrer", "parler",
        "peindre", "plier", "poser", "prendre", "préparer", "ranger", "réciter",
        "recommencer", "regarder", "remettre", "répéter", "répondre", "sentir",
        "souligner", "tailler", "se taire", "tenir", "terminer", "toucher",
        "travailler", "trier", "adroit", "difficile", "dur", "facile", "lisse",
        "maladroit", "pointu", "rugueux", "tordu", "dangereux", "épais", "fort",
        "gauche", "groupé", "immobile", "rond", "serré", "souple", "déçu", "triste",
        "chaud", "froid", "pluvieux", "nuageux", "humide", "gelé", "instable", "changeant",
        "abricot", "ail", "aliment", "ananas", "banane", "bifteck", "café", "carotte",
        "cerise", "chocolat", "chou", "citron", "citrouille", "clémentine", "concombre",
        "coquillage", "corbeille", "crabe", "crevette", "endive", "farine", "fraise",
        "framboise", "fromage", "fruit", "gâteau", "haricot", "huile", "légume", "marchand",
        "melon", "monnaie", "navet", "noisette", "noix", "nourriture", "oignon", "orange",
        "panier", "pâtes", "pêche", "persil", "poire", "poireau", "pomme",
        "prix", "prune", "queue", "raisin", "riz", "salade", "sucre", "thé",
        "tomate", "viande", "vin", "adresse", "appartement", "ascenseur", "balcon", "boucherie",
        "boulanger", "boulangerie", "boutique", "bus", "caniveau", "caravane", "carrefour", "cave",
        "charcuterie", "cinéma", "cirque", "cloche", "clocher", "clown", "coiffeur",
        "courrier", "croix", "église", "embouteillage", "endroit", "enveloppe",
        "essence", "facteur", "fleuriste", "foire", "hôpital", "hôtel", "immeuble", "incendie",
        "laisse", "magasin", "manège", "médicament", "moineau", "monde", "monument", "ouvrier",
        "palais", "panneau", "paquet", "parc", "passage", "pharmacie", "pharmacien", "piscine",
        "place", "police", "policier", "pompier", "poste", "promenade", "quartier", "square",
        "timbre", "travaux", "usine", "village", "ville", "voisin", "volet", "ambulance", "bosse",
        "champignon", "dentiste", "docteur", "fièvre", "front", "gorge", "infirmier", "infirmière",
        "jambe", "larme", "médecin", "menton", "mine", "ordonnance", "pansement", "peau", "piqûre",
        "poison", "sang", "santé", "squelette", "trousse", "argent", "aspirateur", "bague", "barrette",
        "bijou", "bracelet", "brosse", "cadre", "canapé", "chambre", "cheveu", "chiffon", "cil",
        "coffre", "coffret", "collier", "couette", "coussin", "couverture", "dent", "dentifrice",
        "drap", "fauteuil", "frange", "glace", "lampe", "lit", "ménage", "or",
        "oreiller", "parfum", "peigne", "pouf", "poupée", "poussette", "poussière", "shampoing",
        "sourcil", "trésor", "tube", "vase"],
        live: 10,
        answerArray: [],
        guessArray: [],
        info: '',
        output: '',
        score: 0
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
        store.set('topScore', newValue)
      }
    }
  },
  mounted () {
    document.body.onkeypress = this.getKeystrokeEvent
    this.initialize()
  },
  methods: {
    topScore () {
      return store.get('topScore')
    },
    locale (locale) {
      this.$i18n.locale = locale
      this.initialize()
    },
    getRandomWord() {
      let word = ''
      if (this.$i18n.locale == 'fr') {
        word = this.wordsListFR[Math.floor(Math.random() * this.wordsListFR.length)]
      } else {
        word = this.wordsListEN[Math.floor(Math.random() * this.wordsListEN.length)]
      }
      return word.split('')
    },
    disableBtn (state) {
      for (var i = 0; i < this.input.length; i++) {
        this.input[i].disabled = state
      }
    },
    getKeystrokeEvent (event) {
      if (event.which === 13 || event.keyCode === 13) {// ENTER key
          this.initialize()
      }
      else if (event.which == null) {// IE
        document.getElementById(String.fromCharCode(event.keyCode)).click()
      } else if (event.which!=0 && event.charCode!=0) {// others
        document.getElementById(String.fromCharCode(event.which)).click()
      } else {
        return null
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
