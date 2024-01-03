"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const faker_1 = require("@faker-js/faker");
const db_1 = __importDefault(require("./db/database/db"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const getErrorMessage_1 = require("./src/functions/getErrorMessage");
const PORT = 3001;
function serverStart() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const connection = yield db_1.default.connect();
        app
            .use((0, cors_1.default)({
            credentials: true,
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200,
        }))
            .use(body_parser_1.default.json())
            .use(body_parser_1.default.urlencoded({ extended: true }))
            .post('/signup', (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { fname, lname, email, password } = request.body;
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            const { rows } = yield connection.query('INSERT INTO users(fname, lname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, email', [fname, lname, email, hashedPassword]);
            response.json({ createdUser: rows[0] });
        }))
            .post('/login', (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            const { rows } = yield connection.query('SELECT * FROM users WHERE email = $1', [email]);
            if (rows.length === 0) {
                response
                    .status(401)
                    .json({ message: 'Your Email or Password is Incorrect' });
            }
            else {
                const correctPassword = yield bcrypt_1.default.compare(password, rows[0].password);
                if (correctPassword) {
                    const token = jsonwebtoken_1.default.sign({ userId: rows[0].id, email: rows[0].email }, 'secret', { expiresIn: '10m' });
                    response.json({ token });
                }
                else {
                    response
                        .status(401)
                        .json({ message: 'Your Email or Password is incorrect' });
                }
            }
        }));
        const randomName = faker_1.faker.person.fullName(); // Rowan Nikolaus
        const randomEmail = faker_1.faker.internet.email(); // Kassandra.Haley@erich.biz
        console.log(randomName, randomEmail);
        app.get('/api/home', (request, response) => {
            response.json({ message: 'Sent to console.' });
        });
        app.get('/db/test', (request, response) => {
            response.json({ message: db_1.default });
        });
        // admin-home methods
        app.get('/admin/admin-home', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allMember = yield db_1.default.query('SELECT * FROM users');
                response.json(allMember.rows);
            }
            catch (err) {
                console.error((0, getErrorMessage_1.getErrorMessage)(err));
            }
        }))
            .delete('/admin/admin-home/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = yield request.params;
                const deleteMember = yield db_1.default.query('DELETE FROM users WHERE id = $1', [id]);
                response.json({ message: 'Member was removed!' });
            }
            catch (err) {
                console.error((0, getErrorMessage_1.getErrorMessage)(err));
            }
        }));
        // admin-merch methods
        // upload merch image
        const merchImageDir = './uploads/merch-image';
        if (!fs_1.default.existsSync(merchImageDir)) {
            fs_1.default.mkdirSync(merchImageDir, { recursive: true });
        }
        const storage = multer_1.default.diskStorage({
            destination: (request, file, callback) => {
                callback(null, merchImageDir);
            },
            filename: (request, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                callback(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
                ;
            },
        });
        const upload = (0, multer_1.default)({ storage: storage });
        app.use('/uploads/merch-image', express_1.default.static(path_1.default.join('uploads', 'merch-image')));
        app.post('/admin/admin-merch', upload.single('image'), (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!request.file) {
                    return response.status(400).json({ error: 'No image provided' });
                }
                // // Resize the image
                // const resizedImagePath = path.join('uploads', 'merch-image', 'resized', request.file.filename);
                // await sharp(request.file.path)
                //   .resize(500, 500) // width, height
                //   .toFile(resizedImagePath);
                // Save the file path in the database
                const filePath = path_1.default.join('uploads', 'merch-image', request.file.filename);
                const { name, description, price } = request.body;
                const query = 'INSERT INTO merch (name, description, image, price) VALUES ($1, $2, $3, $4) RETURNING *';
                const values = [name, description, filePath, price];
                const newMerch = yield db_1.default.query(query, values);
                // response.json(newMerch.rows[0]);
                return response.status(200).json({ success: true, data: newMerch.rows[0] });
            }
            catch (err) {
                // console.error(getErrorMessage(err));
                console.error('Error uploading image', err);
                return response.status(500).json({ error: 'Internal Server Error' });
            }
        }));
        // get all merch
        app.get('/admin/admin-merch', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const allMerch = yield db_1.default.query('SELECT * FROM merch');
                response.json(allMerch.rows);
            }
            catch (err) {
                console.error((0, getErrorMessage_1.getErrorMessage)(err));
            }
        }));
        // get one merch
        app.get('/admin/admin-merch/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const merch = yield db_1.default.query('SELECT * FROM merch WHERE id = $1', [id]);
                response.json(merch.rows[0]);
            }
            catch (err) {
                console.error((0, getErrorMessage_1.getErrorMessage)(err));
            }
        }));
        // update a merch
        app.put('/admin/admin-merch/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { name, description, image, price } = request.body;
                const updateMerch = yield db_1.default.query('UPDATE merch SET name = $1, description = $2, image = $3, price = $4 WHERE id = $5', [name, description, image, price, id]);
                response.json('Merch was uploaded!');
            }
            catch (err) {
                console.error((0, getErrorMessage_1.getErrorMessage)(err));
            }
        }));
        // delete a merch
        app.delete('/admin/admin-merch/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const deleteMerch = yield db_1.default.query('DELETE FROM merch WHERE id = $1', [
                    id,
                ]);
                response.json('Merch was deleted!');
            }
            catch (err) {
                console.error((0, getErrorMessage_1.getErrorMessage)(err));
            }
        }));
        // client-side merch methods
        // admin-events methods
        app.get('/admin/admin-events', (request, response) => {
            response.json({ message: 'This is the admin events panel' });
        });
        app.listen(PORT, () => {
            console.log('Server started on', PORT);
        });
    });
}
serverStart();
