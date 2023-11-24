<template>
    <div class="flex justify-center gap-2 items-center">
    <h1>หน้าแสดงข้อมูลผู้ใช้</h1>
    <NuxtLink to="/add" class="btn btn-neutral">เพิ่มผู้ใช้</NuxtLink>
    </div>

    <div class="mx-auto xl:mx-80">
        <TableUser :users="users" :isLoading="isLoading" :fetchUsers="fetchUsers" />
    </div>
    
</template>

<script setup lang="ts">
import axios from 'axios'

import type { userType } from '~/types/user';

const users = ref<userType[]>([])
const isLoading = ref<boolean>(false)

const fetchUsers = async () => {
    try {
        isLoading.value = false
        const response = await axios.get(`${import.meta.env.VITE_API}/`)

        if(response.status == 200) {
            isLoading.value = true
            users.value = response.data
        }

    } catch (err) {
        isLoading.value = false
        console.log(err)
    }
}

onMounted(() => fetchUsers())

</script>

<style scoped>

</style>