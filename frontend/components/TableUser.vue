<template>
<div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Username</th>
        <th>Email</th>
        <th>Tools</th>
      </tr>
    </thead>
    <tbody>
      
      <tr v-if="isLoading" v-for="(item, index) in props.users">
        <th>{{ index + 1 }}</th>
        <td>{{ item.username }}</td>
        <td>{{ item.email }}</td>
        <td>
            <div class="flex gap-2">
                <NuxtLink :to="`/update/${item.id}`" class="btn btn-primary">อัพเดท</NuxtLink>
                <NuxtLink :to="`/change/${item.id}`" class="btn btn-secondary">เปลี่ยนรหัสผ่าน</NuxtLink>
                <button class="btn" @click="deleteUser(Number(item.id))">ลบ</button>
            </div>
        </td>
      </tr>

      <tr v-else>
        <td>กำลังโหลดข้อมูล...</td>
      </tr>

    </tbody>
  </table>
</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import type { userType } from '~/types/user';


const deleteUser = async (id : number) => {
    try {  
        const response = await axios.delete(`${import.meta.env.VITE_API}/${id}`)

        if(response.status == 200) {
            alert(response.data)
            props.fetchUsers()
        }
    } catch (err) {
        console.log(err)
    }
}

const props = defineProps<{
  users: userType[];
  isLoading: boolean;
  fetchUsers: Function;
}>();

</script>

<style scoped>

</style>