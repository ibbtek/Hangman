<template>
  <div>
    <p>
        <input
          v-for="i in (13)"
          :key="i+96"
          :id="String.fromCharCode(i+96)"
          :value="String.fromCharCode(i+96)"
          type="button"
          @click="$emit('key:letter', $event)"/>
      </p>
      <p>
        <input
          v-for="i in (13)"
          :key="i+109"
          :id="String.fromCharCode(i+109)"
          :value="String.fromCharCode(i+109)"
          type="button"
          @click="$emit('key:letter', $event)"/>
      </p>
  </div>
</template>
<script>
export default {
  mounted () {
    document.body.onkeypress = this.getKeystrokeEvent
  },
  methods: {
    getKeystrokeEvent (event) {
      if (event.which === 13 || event.keyCode === 13) {// ENTER key
          this.$emit('key:enter')
      }
      else if (event.which == null) {// IE
        document.getElementById(String.fromCharCode(event.keyCode)).click()
      } else if (event.which!=0 && event.charCode!=0) {// others
        document.getElementById(String.fromCharCode(event.which)).click()
      } else {
        return null
      }
    }
  }
}
</script>