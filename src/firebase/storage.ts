import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from './config'
import { uriToBlob } from '@/utils'

export const uploadFile = async (uri: string, fileName: string) => {
  try {
    const storageRef = ref(storage, `transaction-documents/${fileName}`)
    const blob = await uriToBlob(uri)
    const uploadTask = uploadBytesResumable(storageRef, blob)

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
        },
        error => {
          console.error('Upload failed', error)
          reject(error)
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
          console.log('Download URL:', downloadUrl)
          resolve(downloadUrl)
        }
      )
    })
  } catch (error) {
    throw error
  }
}
