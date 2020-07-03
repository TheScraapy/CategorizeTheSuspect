import KariosApi from '@/services/KariosApi'

export default {
  detect (image) {
    return KariosApi().post('detect', {
      'image': image
    }, {
      headers: {
        'Content-Type': 'application/json',
        'app_id': process.env.VUE_APP_KAIROS_APP_ID,
        'app_key': process.env.VUE_APP_KAIROS_API_KEY
      }
    })
  }
}
