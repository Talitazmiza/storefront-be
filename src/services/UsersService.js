// const { nanoid } = require("nanoid");
// const { Pool } = require("pg");
// const bcrypt = require("bcrypt");
// const InvariantError = require("../exceptions/InvariantError");

// const slug = require("slug");
// const users = require("../models/user");
// const db = require("../models");

// const Role = db.Role;
// const User = db.User;

// const Sequelize = require('sequelize');
// const paginationHelper = require("../helpers/paginationHelper");
// const Op = Sequelize.Op;

// const { DB } = require("./../database/config");
const NotFoundError = require("../exceptions/NotFoundError");
const { User } = require("../repository/user.repository");
const { ResponseService } = require("../helpers/hapiResponse");

class UsersService {

    constructor() {
        this.userRepository = new User();
    }

    transformer(data) {
        let user = {};

        user["Id"] = data.id
        user["RoleId"] = data.role_id
        user["Username"] = data.username
        user["Password"] = data.Password
        user["Email"] = data.email
        user["Status"] = data.status
        user["CreatedAt"] = data.createdAt
        user["UpdatedAt"] = data.updatedAt

        return user
    }

    transformers(data) {
        const users = Array.from(data)
        let result = []

        for (const index in users) {
            const user = users[index]
            result.push(this.transformer(user))
        }

        return result
    }

    async getUserAll() {
        try {
            const users = await this.userRepository.GetAll("id, username, email");
            const transformer = this.transformers(users)
            return ResponseService(200, "yay success get all user", transformer)
        } catch (e) {
            console.log('ERROR === ', e)
            throw new NotFoundError("Somwhat Wrong");
        }
    }

    // async addUser({ name,username,confPassword , email,address, password,as,role_id ,phone_number}) {

    //     await this.verifyNewUserCompany(username,email);

    //     const id = `user-${nanoid(16)}`;

    //     const salt = await bcrypt.genSalt();
    //     const hashPassword = await bcrypt.hash(password, salt);
    //     const slug_data = slug(name, '-');

    //     try {
    //         const user = await User.create({
    //             role_id: role_id,
    //             full_name: name,
    //             slug: slug_data,
    //             username: username,
    //             email: email,
    //             address: address,
    //             password: hashPassword
    //         });

    //         if (role_id == 2){
    //             companyDetailService.addTmpCompanyDetail(user.id,phone_number);
    //             console.log('company');
    //         }else {

    //             candidateDetailService.addTmpCandidateDetail(user.id,phone_number);
    //             console.log('candidate');
    //         }
    //         return user.id;

    //     }catch (e) {

    //         console.log(e)
    //         throw new InvariantError("User gagal ditambahkan");

    //     }
    // }
    // async updateUsers({ user_id,name,username,confPassword , email,address, password,as,role_id ,phone_number}) {

    //     await this.verifyNewUserCompany(username,email);


    //     const salt = await bcrypt.genSalt();
    //     const hashPassword = await bcrypt.hash(password, salt);
    //     const slug_data = slug(name, '-');

    //     try {
    //         const user = await User.update({
    //             role_id: role_id,
    //             full_name: name,
    //             slug: slug_data,
    //             username: username,
    //             email: email,
    //             password: hashPassword
    //         },{
    //             where: {
    //                 id : user_id
    //             }
    //         });

    //         if (role_id == 2){
    //             companyDetailService.addTmpCompanyDetail(user.id,phone_number);
    //             console.log('company');
    //         }else {

    //             candidateDetailService.addTmpCandidateDetail(user.id,phone_number);
    //             console.log('candidate');
    //         }
    //         return user.id;

    //     }catch (e) {

    //         console.log(e)
    //         throw new InvariantError("User gagal ditambahkan");

    //     }
    // }

    // async verifyNewUserCompany(username,email) {

    //     // const data = await User.findAll();
    //     // const data = await User.findAll({ include: { association: 'role' } });


    //     const cek_username = await User.findOne({ where: { username: username } });
    //     const cek_email = await User.findOne({ where: { email: email } });


    //     if (cek_username) {
    //         throw new InvariantError("Gagal menambahkan user. Username sudah digunakan.");
    //     }

    //     if (cek_email) {
    //         throw new InvariantError("Gagal menambahkan user. Email sudah digunakan.");
    //     }
    // }

    // async getUserAll(page_tmp,size_tmp,search_tmp,role_tmp) {


    //     const page = page_tmp || 0;
    //     const size = size_tmp || 10;
    //     const search = search_tmp || '';
    //     const role = role_tmp || '';
    //     const { limit, offset } = await paginationHelper.getPagination(page, size);

    //     let condition ;

    //     if (search && role){
    //         condition = {
    //             [Op.and]: {
    //                 full_name: {[Op.iLike]: `%${search}%`},
    //                 role_id: role,
    //             }
    //         };
    //     }else if(search){
    //         // console.log('sini')
    //         condition = {
    //             [Op.or]: {
    //                 full_name: {[Op.iLike]: `%${search}%`},
    //             }
    //         };
    //     }else if (role){
    //         console.log('sini')
    //         condition = {
    //             [Op.or]: {
    //                 role_id: role,
    //             }
    //         };
    //     }else {
    //         condition = null;
    //     }
    //     try {
    //         const models = await User.findAndCountAll({
    //             where: condition,
    //             limit,
    //             offset,
    //         });

    //         const response = paginationHelper.getPagingData(models, page, limit);
    //         return ResponseService(200, "success get users", response);

    //     }catch (e) {
    //         console.log("ERROR : ", e);
    //         throw new NotFoundError("terjadi kesalahan");

    //     }

    // }

    // async getProfile(decodeJwt) {
    //     var data ;
    //     try {

    //         data = await User.findOne({
    //             where:{
    //                 id : decodeJwt.id
    //             }
    //         });

    //         return data;

    //     }catch (e) {
    //         throw new NotFoundError("profile tidak ditemukan");
    //     }

    // }

    // async verifyUserCredential(username, password) {

    //     const data = await User.findOne({
    //         where: { username: username },
    //         include: { association: 'role' }
    //     });



    //     if (!data) {
    //         throw new InvariantError("Kredensial yang Anda berikan salah");
    //     }

    //     const match = await bcrypt.compare(password, data.password);

    //     if (!match) {
    //         throw new AuthenticationError("Kredensial yang Anda berikan salah");
    //     }
    //     return data;
    // }

    // async getUsersByUsername(username) {
    //   try {
    //     const query = {
    //         text: "SELECT id, username FROM users WHERE username LIKE $1",
    //         values: [`%${username}%`],
    //     };
    //     const result = await this._pool.query(query);

    //     return ResponseService(200, "success get users", result.rows)
    //   } catch (error) {
    //     throw error
    //   }
    // }
}

module.exports = UsersService;
