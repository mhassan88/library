"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const books_1 = __importDefault(require("../Models/books"));
router.get("/", (req, res, next) => {
    books_1.default.find((err, books) => {
        if (err) {
            return console.error(err);
        }
        else {
            res.render("books/index", {
                title: "Books",
                page: "books",
                books: books,
            });
        }
    });
});
router.get("/add", (req, res, next) => {
    res.render("books/details", {
        title: "Add a Book",
        page: "details",
        books: new books_1.default(),
    });
});
router.post("/add", (req, res, next) => {
    let newBook = new books_1.default({
        Title: req.body.title,
        Price: req.body.price,
        Author: req.body.author,
        Genre: req.body.genre,
    });
    books_1.default.create(newBook, (err) => {
        if (err) {
            console.log(err);
            return res.end(err);
        }
        res.redirect("/books");
    });
});
router.get("/:id", (req, res, next) => {
    books_1.default.findById({ _id: req.params.id }, {}, {}, (err, book) => {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render("books/details", {
            title: "Edit a Book",
            page: "details",
            books: book,
        });
    });
});
router.post("/:id", (req, res, next) => {
    let id = req.params.id;
    let updatedBook = new books_1.default({
        _id: id,
        Title: req.body.title,
        Price: req.body.price,
        Author: req.body.author,
        Genre: req.body.genre,
    });
    books_1.default.updateOne({ _id: id }, updatedBook, {}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.redirect("/books");
    });
});
router.get("/delete/:id", (req, res, next) => {
    let id = req.params.id;
    books_1.default.deleteOne({ _id: id }, {}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        res.redirect("/books");
    });
});
//# sourceMappingURL=books.js.map