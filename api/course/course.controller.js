// this files contains handler methods for routes defined in api/course/index.js
const repo = require('./course.repository');

exports.index = async (req, res) => {
    try{
        const rows = await repo.getCoursesWithScholarships(req.query)

        res.status(200).json(rows)
    } catch(error) {
        console.log("error occurred: ", error)

        res.status(500).json({
            message: "Something went wrong",
            error: error,
        })
    }
}