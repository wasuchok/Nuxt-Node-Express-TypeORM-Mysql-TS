<template>
         <div class="text-xl my-2">
        <h1>หน้าเปลี่ยนรหัสผ่าน : </h1>
    </div>
    <form @submit.prevent="checkPassword">
    <div class="flex flex-col gap-3">
        <input type="password" placeholder="Old Password" class="input input-bordered input-primary w-full max-w-xs" v-model="change.oldPassword" required />
        <input type="password" placeholder="New Password" class="input input-bordered input-primary w-full max-w-xs" v-model="change.newPassword" required />
        <input type="password" placeholder="New Password Confirm" class="input input-bordered input-primary w-full max-w-xs" v-model="change.newPasswordConfirm" required />
    </div>
    <button class="btn btn-primary w-full max-w-xs my-2">ยืนยัน</button>
    </form>
</template>

<script setup lang="ts">
import axios from 'axios'
const route = useRoute()

interface passwordType {
    oldPassword: string
    newPassword: string
    newPasswordConfirm: string
}

const change = ref<passwordType>({
    oldPassword : '',
    newPassword : "",
    newPasswordConfirm : ""
})

const changePassword = async () => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_API}/changePassword/${route.params.id}` , {
            password : change.value.oldPassword,
            newPassword : change.value.newPassword
        })
        if(response.status == 200) {
            alert(response.data)
            navigateTo('/')
        }
    } catch (err : any) {
        console.log(err)
        if(err.response.data) {
            alert(err.response.data)
        }
    }
}

const checkPassword = async () => {
    if(change.value.newPassword.length > 0 && change.value.newPassword == change.value.newPasswordConfirm) {
        changePassword()
    } else {
        alert("รหัสผ่านไม่ตรงกัน")
    }
}

</script>

<style scoped>

</style>