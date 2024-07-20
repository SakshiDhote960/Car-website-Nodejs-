import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import Collection from '../mongo.js';
import bcryptjs from 'bcryptjs';

const router = express.Router();

export async function hashPass(password) {
    return await bcryptjs.hash(password, 10);
}

export async function compare(userPass, hashPass) {
    return await bcryptjs.compare(userPass, hashPass);
}

router.get('/login/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/login/facebook', passport.authenticate('facebook', {
    scope: ['public_profile']
}));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/home');
});

router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/home');
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/signup');
    });
});

router.post('/signup', async (req, res) => {
    try {
        const check = await Collection.findOne({
            name: req.body.name
        });

        if (check) {
            res.send('User already exists');
        } else {
            const token = jwt.sign({
                name: req.body.name
            }, 'hellowelcometosakshiloginandsignuppage');
            const data = {
                name: req.body.name,
                mobile: req.body.mobile,
                password: await hashPass(req.body.password),
                token: token
            };

            await Collection.insertMany([data]);
            res.render('home', {
                name: req.body.name
            });
        }
    } catch (error) {
        res.send('Error: ' + error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const check = await Collection.findOne({
            name: req.body.name
        });
        const passCheck = await compare(req.body.password, check.password);

        if (check && passCheck) {
            res.render('home', {
                name: req.body.name
            });
        } else {
            res.send('Wrong details');
        }
    } catch (error) {
        res.send('Error: ' + error.message);
    }
});

export default router;
