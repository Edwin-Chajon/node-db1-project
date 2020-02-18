const express = require('express');

const Accounts = require('../data/dbConfig');

const router = express.Router()

router.get('/', (req, res) => {
    Accounts.select('*').from('accounts')
        .then(accounts => {res.status(200).json(accounts)})
        .catch(() => {res.status(500).json({Message: "error requesting."})})
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Accounts('accounts').where({id}).first()
        .then(account => {res.status(200).json(account)})
        .catch(() => {res.status(500).json({Message: "doesn't exist."})})
});


router.post('/', (req, res) => {
    const AccountData = req.body;
    Accounts('accounts').insert(AccountData, 'id')
        .then(([id]) => {
            Accounts('accounts').where({id}).first()
            .then(account => {res.status(201).json(account)})
            .catch(() => {res.status(500).json({Message: "problem adding new account."})})});
});

router.put('/:id', (req, res) => {
    const changes = req.body;
    const {id} = req.params.id;
    Accounts('accounts').where({id}).update(changes)
        .then(() => {res.status(200).json({Message: `Successfully updated!`})})
        .catch(() => {res.status(500).json({Message: "Problem updating account."})});
});

router.delete('/:id', (req, res) => {
    Accounts('accounts').where({id: req.params.id}).del()
    .then(() => {res.status(200).json({Message: `Deleted account.`})})
    .catch(() => {res.status(500).json({Message: "There was a problem deleting account."})});
});

module.exports = router;