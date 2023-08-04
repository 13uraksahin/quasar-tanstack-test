import { defineStore, PiniaCustomProperties } from 'pinia'
import { ref, computed } from 'vue'
import axios, { AxiosRequestConfig } from 'axios'
import { Notify } from 'quasar'

export const useUsers = defineStore('users', () => {
  const data = ref<any>([])
  const selected = ref<any>({})

  const cleanSelected = () => {
    selected.value = {}
  }

  async function fetchAll () {
    console.log('fetching users')
    try {
      const response = await axios('http://localhost:3000/users')
      const responseData = await response.data
      console.log('response: ', responseData)
      data.value = responseData
      return responseData
    } catch (error) {
      Notify.create({
        message: 'Error fetching users',
        color: 'negative'
      })
      console.error(error)
    }
  }

  async function fetchOne (id: string) {
    console.log('fetching user')
    try {
      const response = await axios(`http://localhost:3000/users/${id}`)
      const responseData = await response.data
      console.log('response: ', response)
      console.log('responseData: ', responseData)
      selected.value = responseData
      return responseData
    } catch (error) {
      Notify.create({
        message: 'Error fetching user',
        color: 'negative'
      })
      console.error(error)
    }
  }

  async function create (this: PiniaCustomProperties) {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: 'http://localhost:3000/users',
      data: selected.value
    }

    try {
      const response = await axios(config)
      const responseData = await response.data
      console.log('response: ', response)
      console.log('responseData: ', responseData)
      data.value = responseData
      Notify.create({
        message: 'User created',
        color: 'positive'
      })
      this.router.push({ name: 'UsersUpdateUnique', params: { id: responseData.id } })
      return response
    } catch (error) {
      Notify.create({
        message: 'Error creating user',
        color: 'negative'
      })
      console.error(error)
    } finally {
      await fetchAll()
    }
  }

  async function update () {
    const config: AxiosRequestConfig = {
      method: 'PATCH',
      url: `http://localhost:3000/users/${selected.value.id}`,
      data: selected.value
    }

    try {
      const response = await axios(config)
      const responseData = await response.data
      console.log('response: ', response)
      console.log('responseData: ', responseData)
      data.value = responseData
      Notify.create({
        message: 'User updated',
        color: 'positive'
      })
      return responseData
    } catch (error) {
      Notify.create({
        message: 'Error updating user',
        color: 'negative'
      })
      console.error(error)
    } finally {
      await fetchAll()
    }
  }

  async function remove (id: string) {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `http://localhost:3000/users/${id}`
    }

    try {
      const response = await axios(config)
      const responseData = await response.data
      console.log('response: ', response)
      console.log('responseData: ', responseData)
      Notify.create({
        message: 'User removed',
        color: 'positive'
      })
      return response
    } catch (error) {
      Notify.create({
        message: 'Error removing user',
        color: 'negative'
      })
      console.error(error)
    } finally {
      await fetchAll()
    }
  }

  const mutateName = computed({
    get: () => selected.value ? selected.value.name : '',
    set: val => { selected.value ? selected.value.name = val : selected.value = { name: val } }
  })

  const mutateEmail = computed({
    get: () => selected.value ? selected.value.email : '',
    set: val => { selected.value ? selected.value.email = val : selected.value = { email: val } }
  })

  return {
    data,
    selected,
    cleanSelected,
    fetchAll,
    fetchOne,
    create,
    update,
    remove,
    mutateName,
    mutateEmail
  }
})
