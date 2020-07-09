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
      <div class="subtitle">OR</div>
      <div class="subtitle">
        <b-upload drag-drop v-model="file" @input="upload()">
          <a class="button is-primary title">
            <b-icon icon="upload"></b-icon>
            <span>Click to upload</span>
          </a>
          <span class="file-name subtitle" v-if="file">{{ file.name }}</span>
        </b-upload>
      </div>
      <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
      <img v-if="image" v-bind:src="image" width="640" />
    </div>
    <div class="section">
      <b-button
        type="is-success"
        size="is-large"
        icon-left="crosshairs"
        @click="detect()"
      >Detect</b-button>
    </div>
    <div class="subtitle">
      <div class="title" v-if="age && gender">Results :</div>
      <div v-if="age">Age : {{ age }}</div>
      <div v-if="gender">Gender : {{ gender }}</div>
      <canvas ref="chart" id="chart"></canvas>
    </div>
  </div>
</template>

<script>
import FaceRecognition from '@/services/FaceRecognition'
import Chart from 'chart.js'

export default {
  name: 'Home',
  data () {
    return {
      video: {},
      canvas: {},
      chart: {},
      image: null,
      file: null,
      age: null,
      gender: null
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
      this.file = null
    },
    upload () {
      var reader = new FileReader()
      reader.onload = (e) => {
        this.image = e.target.result
      }
      reader.readAsDataURL(this.file)
    },
    async detect () {
      let loader = null
      try {
        if (this.image) {
          loader = this.$buefy.loading.open()
          const res = await FaceRecognition.detect(this.image)
          if (res.data.Errors) {
            this.alertCustomError('🤕 ' + res.data.Errors[0].Message, loader)
          } else {
            loader.close()
            this.trimData(res.data.images[0].faces[0].attributes)
          }
        } else {
          this.alertCustomError('🤕 Take a photo before dectecting features', loader)
        }
      } catch (e) {
        this.alertCustomError('🤕 Could not detect facial features', loader)
      }
    },
    trimData (data) {
      this.age = data.age
      if (data.gender.type === 'M') {
        this.gender = 'Male'
      } else if (data.gender.type === 'F') {
        this.gender = 'Female'
      }
      var chart = [
        data.white * 100,
        data.black * 100,
        data.hispanic * 100,
        data.asian * 100,
        data.other * 100
      ]
      this.createChart(chart)
    },
    createChart (data) {
      this.chart = new Chart(this.$refs.chart, {
        type: 'radar',
        data: {
          labels: ['White', 'Black', 'Hispanic', 'Asian', 'Other'],
          datasets: [{
            label: '% of ethnicity',
            data: data,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)'
          }]
        },
        options: {
          scale: {
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100
            }
          }
        }
      })
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
