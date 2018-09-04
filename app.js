const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 9000
const csvToJson = require("convert-csv-to-json")
const studentData = csvToJson.fieldDelimiter(",").getJsonFromCsv("students.csv")

app.use(cors())

function findById(data,id) {
for(let i=0;i < data.length;i++) {
    let idString = data[i].ID.toString()
    if(idString === id) {
        return data[i]
    }
} return null
}

app.get("/",(req,res,next) => {
    res.json({studentData: studentData})
})

app.get("/:id",(req,res,next) => {
    const students = findById(studentData,req.params.id)
    if(!students) {
        res.status(404).send({
            error: {
                message: "No record found!"
            }
        })
    } else {
        res.json({studentData:students})
    }
})

app.listen(port, () => {
    console.log(`I am listening on ${port}`)
})

