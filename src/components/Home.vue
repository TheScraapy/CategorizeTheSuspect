<template>
  <div id="home" class="container">
    <div>
      <div>
        <video ref="video" id="video" width="640" height="480" autoplay></video>
      </div>
      <div class="subtitle">
        <b-button
          type="is-info"
          size="is-large"
          icon-left="camera"
          @click="capture()"
        >Snap Photo</b-button>
      </div>
      <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
      <img v-bind:src="image" height="50" />
    </div>
    <div class="section">
      <b-button
        type="is-info"
        size="is-large"
        icon-left="crosshairs"
        @click="detect()"
      >Detect</b-button>
    </div>
  </div>
</template>

<script>
import FaceRecognition from '@/services/FaceRecognition'

export default {
  name: 'Home',
  data () {
    return {
      video: {},
      canvas: {},
      image: null
    }
  },
  mounted () {
    this.video = this.$refs.video
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.srcObject = stream
      })
    }
  },
  methods: {
    capture () {
      this.canvas = this.$refs.canvas
      this.canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 480)
      this.image = this.canvas.toDataURL('image/png')
    },
    async detect () {
      let loader = null
      try {
        if (this.image) {
          loader = this.$buefy.loading.open()
          const res = await FaceRecognition.detect(this.image)
          console.log(res)
          if (res.data.Errors) {
            this.alertCustomError('🤕 ' + res.data.Errors[0].Message, loader)
          } else {
            console.log('No errors')
          }
        } else {
          this.alertCustomError('🤕 Take a photo before dectecting features', loader)
        }
      } catch (e) {
        this.alertCustomError('🤕 Could not detect facial features', loader)
      }
    },
    alertCustomError (msg, loader) {
      if (loader !== null) {
        loader.close()
      }
      this.$buefy.dialog.alert({
        title: 'Error',
        message: msg,
        type: 'is-danger',
        hasIcon: true,
        icon: 'times-circle',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        ariaModal: true
      })
    }
  }
}
</script>

<style scoped>
body {
  background-color: #f0f0f0;
}

#video {
  background-color: #000000;
  border: 1px solid grey;
}

img {
  background-color: #000000;
  border: 1px solid grey;
}

#canvas {
  display: none;
}

li {
  display: inline;
  padding: 5px;
}
</style>
