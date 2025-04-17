import JWT from "jsonwebtoken"

//Admin authentication middleware 

const AuthAdmin = async (req, res, next) => {
    try {

        const { atoken } = req.headers
        if (!atoken) {
            return res.json({
                success: false,
                message: "Not authorised to login again"
            })
        }

        const token_decode = JWT.verify(atoken, process.env.JWT_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.json({
                success: false,
                message: "Not authorised to login again"
            })
        }

        next();

    } catch (error) {
        console.error(error)
        res.status(500).send({
            success: false,
            message: "error in middleware"
        })
    }
}
export default AuthAdmin;