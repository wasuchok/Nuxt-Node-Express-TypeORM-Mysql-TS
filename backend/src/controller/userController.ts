import { Request, Response } from "express";
import { myDataSource } from "../../app-data-source";
import { user } from "../entitys/userEntity";
import bcrypt from 'bcrypt'


const saltRounds = 10;

export const getAllUsers = async (req : Request, res : Response) => {
    try {
        const userRepository = await myDataSource.getRepository(user)
        const users = await userRepository.find()
        users && res.send(users)
    } catch (err) {
        console.log(err)
        res.send('Server error')
    }
}

export const getSingleUser = async (req : Request, res : Response) => {
    try {
        const userRepository = await myDataSource.getRepository(user)
        const userSingle = await userRepository.findOne({ where : { id : Number(req.params.id) }})
        userSingle && res.send(userSingle)
    } catch (err) {
        console.log(err)
        res.send('Server error')
    }
}

export const createUser = async (req : Request, res : Response) => {
    try {
        const userRepository = await myDataSource.getRepository(user)
        const checkUser = await userRepository.findOne({ where : { username : req.body.username }})
        if(checkUser) return res.status(404).send('มีผู้ใช้แล้ว')
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            req.body.password = hash
            const newUser = await userRepository.create(req.body)
            const result = await userRepository.save(newUser)
            result && res.send('เพิ่มข้อมูลผู้ใช้สำเร็จ')
        });
    } catch (err) {
        console.log(err);
        res.send('Server error')
    }
}

export const updateUser = async (req : Request, res : Response) => {
    try {
        const userRepository = await myDataSource.getRepository(user)
        const checkUser = await userRepository.findOne({ where : { id : Number(req.params.id) }})
        if(!checkUser)  return res.status(404).send('ไม่มีผู้ใข้')
        userRepository.merge(checkUser, req.body)
        const result = await userRepository.save(checkUser)
        result && res.send("แก้ไขข้อมูลสำเร็จแล้ว")
    } catch (err) {
        console.log(err);
        res.send('Server error')
    }
}

export const changePassword = async (req : Request, res : Response) => {
    try {
        const userRepository = await myDataSource.getRepository(user);
        const checkUser = await userRepository.findOne({ where : { id : Number(req.params.id) }});
        if(!checkUser)  return res.status(404).send('ไม่มีผู้ใข้')
        bcrypt.compare(req.body.password, checkUser.password, async (err, result) => {
            if(result) {
                bcrypt.hash(req.body.newPassword, saltRounds, async (err, hash) => {
                    req.body.newPassword = hash
                    const updatePassword = await userRepository
                    .createQueryBuilder()
                    .update(user)
                    .set({ password : req.body.newPassword })
                    .where("id = :id", { id : req.params.id })
                    .execute()
                    if(updatePassword) res.send('เปลี่ยนรหัสผ่านสำเร็จ')
                });
            } else {
               return res.status(404).send('รหัสผ่านไม่ถูกต้อง')
            }
        });
    } catch (err) {
        console.log(err);
        res.send('Server error')
    }
}

export const deleteUser = async (req : Request, res : Response) => {
    try {
        const userRepository = await myDataSource.getRepository(user)
        const checkUser = await userRepository.findOne({ where : { id : Number(req.params.id) }})
        if(!checkUser) return res.send("ไม่มีผู้ใข้")
        const removeUser = await userRepository.delete(req.params.id)
        removeUser && res.send("ลบข้อมูลผู้ใช้สำเร็จ")
    } catch (err) {
        console.log(err);
        res.send('Server error')
    }
}

