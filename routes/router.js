import express from 'express';
const router = express.Router();

router.get('/header', (req, res) => {
    res.render('header');
});

router.get('/footer', (req, res) => {
    res.render('footer');
});

router.get('/home', (req, res) => {
    res.render('home');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/', (req, res) => {
    res.render('main');
});

export default router;
