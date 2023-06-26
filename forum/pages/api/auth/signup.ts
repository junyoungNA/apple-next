import { insertUser, findUserList } from "@/app/util/mongo";
import { ReqRes } from "../test";
import bcrypt from 'bcrypt';

const signupHandler : ReqRes  = async(req, res) => {
    if(req.method ==='POST') {
        if (req.body.userId.trim() === "" || req.body.password.trim() === "") {
            return res.status(500).json("공백은 입력할 수 없습니다.");
        }
        const result = await findUserList();
        const find = result.findIndex(item => {
        if ("email" in item) {
            return req.body.email === item.email;
        }
        return false;
        });
        if (find !== -1) {
            console.log("이미 가입된 이메일입니다.");
            return res.redirect(302, "/auth");
        }
        const hash = await bcrypt.hash(req.body.password,10);
        req.body.password = hash;
        await insertUser(req.body);
        res.status(200).json('가입성공');
    }
}

export default signupHandler;