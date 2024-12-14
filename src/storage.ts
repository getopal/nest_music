
import { diskStorage } from 'multer'
import { v4 as uuidv4 } from 'uuid'
import * as path from 'path'
import * as fs from 'fs'

const normalizeFileName = (req, file, callback) => {
    const fileExtName = path.extname(file.originalname)
    const fileName = `${uuidv4()}${fileExtName}`
    callback(null, fileName)
}

export const audioStorage = diskStorage({
    destination: './uploads/audio',
    filename: normalizeFileName
})
