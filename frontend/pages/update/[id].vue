<template>
        <div class="text-xl my-2">
        <h1>หน้าข้อมูลผู้ใช้ : {{ user.username }}</h1>
    </div>
    <form @submit.prevent="updateUser">
    <div class="flex flex-col gap-3">
        <input type="text" placeholder="Username" class="input input-bordered input-primary w-full max-w-xs" v-model="user.username" required />
        <input type="email" placeholder="Email" class="input input-bordered input-primary w-full max-w-xs" v-model="user.email" required />
    </div>
    <button class="btn btn-primary w-full max-w-xs my-2">ยืนยัน</button>
    </form>
</template>

<script setup lang="ts">
import axios from 'axios'
import type { userType } from '~/types/user';

const route = useRoute()

const user = ref({
    id : 0,
    username : "",
    email : ""
})

const showUser = async () => {
    try { 
        const response = await axios.get(`${import.meta.env.VITE_API}/${route.params.id}`)
        if(response.status == 200) {
            user.value = response.data
        }
    } catch (err) {
        console.log(err)
    }
}

const updateUser = async () => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_API}/${route.params.id}`, {
            username : user.value.username,
            email : user.value.email
        })
        if(response.status == 200) {
            alert(response.data)
            navigateTo('/')
        }
    } catch (err) {
        console.log(err)
    }
}

onMounted(() => showUser())
</script>

<style scoped>

</style>