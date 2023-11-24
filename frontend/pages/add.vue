<template>
    <div class="text-xl my-2">
        <h1>หน้าเพิ่มข้อมูลผู้ใช้</h1>
    </div>
    <form @submit.prevent="addUser">
    <div class="flex flex-col gap-3">
        <input type="text" placeholder="Username" class="input input-bordered input-primary w-full max-w-xs" required v-model="add_user.username" />
        <input type="email" placeholder="Email" class="input input-bordered input-primary w-full max-w-xs" required v-model="add_user.email" />
        <input type="password" placeholder="Password" class="input input-bordered input-primary w-full max-w-xs" required v-model="add_user.password" />
        <input type="password" placeholder="Confirm Password" class="input input-bordered input-primary w-full max-w-xs" required  v-model="add_user.confirm_password"/>
    </div>
    <button class="btn btn-primary w-full max-w-xs my-2">เพิ่ม</button>
    </form>
</template>

<script setup lang="ts">
import axios from 'axios';
import type { addType } from '../types/user'

const add_user = ref<addType>({
    username : "",
    email : "",
    password : "",
    confirm_password : ""
})

const addUser = async () => {
    if(add_user.value.password.length > 0 && add_user.value.password == add_user.value.confirm_password) {
       const response = await axios.post(`${import.meta.env.VITE_API}/`, {
        ...add_user.value
       })
    if(response.status == 200) {
        alert(response.data)
        navigateTo('/')
    }
    } else {
        alert("รหัสผ่านไม่ถูกต้อง")
    }
}

</script>

<style scoped>

</style>