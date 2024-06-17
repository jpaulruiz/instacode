import { ref } from 'vue'

const useFetch = async (url: string) => {
  const data = ref(null)
  const error = ref(null)

  const fetchData = async () => {
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`)
      }
      data.value = await res.json()
    } catch(err: any) {
      error.value = err
    }
  }

  await fetchData()

  return { data, error }
}

export default useFetch